import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Radio, Select, Button, Checkbox, message as Message, Row, Col } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, history } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryHospital, querySkill, queryWorker, updateWorker } from '../service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// 语言技能选项
const languageOptions = [
  { label: '普通话', value: '普通话' },
  { label: '粤语', value: '粤语' },
];

const Worker: React.FC<{}> = (props) => {
  const { serverId } = props.match.params;
  const [workerForm] = Form.useForm();
  const [sex, setSex] = useState("woman") // 性别
  const [language, setLanguage] = useState("") // 语言
  const [skillOptions, setSkillOptions] = useState<Array<any>>([]) // 护理技能选项
  const [skillIdList, setSkillIdList] = useState<Array<any>>([]) // 护工个人护理技能
  const [hospitalOptions, setHospitalOptions] = useState<Array<any>>([]) // 服务医院选项
  const [hospitalIdList, setHospitalIdList] = useState<Array<any>>([]) // 护工服务医院列表
  const [workerInfo, setWorkerInfo] = useState({}) // 护工信息
  const isNew = serverId === 'new';

  useEffect(() => {
    queryHospitalList();
    querySkillList();
    if (serverId !== 'new') {
      queryWorkerInfo();
    }
  }, []);

  // 获取护工信息
  async function queryWorkerInfo() {
    const { data, msg, statusCode } = await queryWorker({
      serverId
    })

    if (statusCode === '10001') {
      resetWorkerInfo(data)
    } else {
      Message.error(msg);
    }
  }

  // 反显护工信息
  function resetWorkerInfo(data: any) {
    const { realName, age, identity, hospitalList, language, sex, skillItemList, telephone } = data;
    const workerHospitalList = hospitalList.map((item: any) => item.hospitalId);
    const workerSkillItemList = skillItemList.map((item: any) => item.skillId);

    setWorkerInfo(data);
    setHospitalIdList(workerHospitalList);
    setSkillIdList(workerSkillItemList);
    setLanguage(language);

    workerForm.setFieldsValue({
      realName,
      age,
      sex,
      telephone,
      identity,
      language,
      hospitalIdList: workerHospitalList,
      skillItemList: workerSkillItemList
    });
  }

  // 查询医院列表
  async function queryHospitalList() {
    const { data, msg, statusCode } = await queryHospital({
      city: "湛江市",
      area: "霞山区"
    })
    if (statusCode === '10001') {
      const options = data.map((item: any) => {
        return {
          label: item.name,
          value: item.hospitalId
        }
      });
      setHospitalOptions(options);
    } else {
      Message.error(msg);
    }
  }

  // 查询护工技能
  async function querySkillList() {
    const { data, msg, statusCode } = await querySkill();
    if (statusCode === '10001') {
      const options = data.map((item: any) => {
        return {
          label: item.itemName,
          value: item.skillId
        }
      });
      setSkillOptions(options);
    } else {
      Message.error(msg);
    }
  }

  // 技能选择
  const handleSkillSelect = (values: Array<any>) => {
    if (values.includes('all')) {
      const newList = skillOptions.map(item => item.value);
      workerForm.setFieldsValue({
        skillIdList: newList,
      });
      setSkillIdList(newList)
    } else {
      setSkillIdList(values)
    }
  }

  // 医院选择
  const handleHospitalChange = (values: Array<any>) => {
    if (values.includes('all')) {
      const newList = hospitalOptions.map(item => item.value);
      workerForm.setFieldsValue({
        hospitalIdList: newList,
      });
      setHospitalIdList(newList);
    } else {
      setHospitalIdList(values)
    }
  }

  // 新增/保存
  const onFinish = async (values: any) => {
    const params = {
      ...values,
      sex,
      language,
      skillIdList,
      hospitalIdList
    };
    if (!isNew) {
      params['serverId'] = workerInfo.serverId;
    }
    const { msg, statusCode } = await updateWorker(isNew ? "create" : "update", params);
    if (statusCode === '10001') {
      if (isNew) {
        Message.success('新增护工成功');
        history.push('/workerList/all')
      } else {
        Message.success('保存成功');
        queryWorkerInfo();
      }
    } else {
      Message.error(msg);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { reviewStatus, onlineStatus, serverNum } = workerInfo;

  return (
    <Form
      {...layout}
      name="basic"
      form={workerForm}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col span={12} >
          <Form.Item
            label="姓名"
            name="realName"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <Form.Item
            label="性别"
            name="sex"
            required
          >
            <Radio.Group
              defaultValue="woman"
              onChange={e => setSex(e.target.value)}
            >
              <Radio value="man" style={{ marginRight: '8px' }}>男</Radio>
              <Radio value="woman">女</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <Form.Item
            label="身份证号"
            name="identity"
            rules={[{ required: true, message: '请输入身份证号' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <Form.Item
            label="联系电话"
            name="telephone"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <Form.Item
            label="掌握语言"
            name="language"
            required
          >
            <Checkbox.Group options={languageOptions} onChange={e => setLanguage(JSON.stringify(e))} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <Form.Item
            label="护理技能"
            name="skillIdList"
            required
          >
            <Select
              mode="multiple"
              onChange={(e: Array<any>) => handleSkillSelect(e)}
              allowClear
            >
              <Select.Option value="all">全选</Select.Option>
              {skillOptions.map(item => (
                <Select.Option value={item.value} key={`skill_${item.value}`}>{item.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <Form.Item
            label="可服务医院"
            name="hospitalIdList"
            required
          >
            <Select
              mode="multiple"
              onChange={(e: Array<any>) => handleHospitalChange(e)}
              allowClear
            >
              <Select.Option value="all">全选</Select.Option>
              {hospitalOptions.map(item => (
                <Select.Option value={item.value} key={`hospital_${item.value}`}>{item.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {
        !isNew && <React.Fragment><Row>
          <Col span={12} >
            <Form.Item
              label="服务次数"
              name="serverNum"
            >
              <>{serverNum}次</>
            </Form.Item>
          </Col>
        </Row>
          <Row>
            <Col span={12} >
              <Form.Item
                label="在线状态"
                name="onlineStatus"
              >
                <>{onlineStatus === 'onLine' ? '上架' : '下架'}</>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} >
              <Form.Item
                label="审核状态"
                name="reviewStatus"
              >
                <>{reviewStatus === 'reviewed' ? '已审核' : '未审核'}</>
              </Form.Item>
            </Col>
          </Row>
        </React.Fragment>
      }
      {/* <Row>
        <Col span={12} >
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Col>
      </Row> */}
      <Row>
        <Col span={12} >
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Worker;
