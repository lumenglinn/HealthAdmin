import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
import { updateWorker, updateLineStatus, updateReviewed, queryList } from './service';

/**
 * 添加节点
 * @param fields
 */
// const handleAdd = async (fields: TableListItem) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

/**
 * 更新节点
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('正在配置');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();

//     message.success('配置成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('配置失败请重试！');
//     return false;
//   }
// };

/**
 *  删除节点
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: TableListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('删除失败，请重试');
//     return false;
//   }
// };

const searchFormFields: Array<TableListItem> = [
  {
    type: 'datetimeRange',
    itemName: 'times',
    label: '日期',
    placeholder: '日期范围',
    initialValue: [null, null],
  },
];

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓1名',
      dataIndex: 'name',
      // tip: '规则名称是唯一的 key',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: fa,
      //       message: '规则名称为必填项',
      //     },
      //   ],
      // },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      hideInForm: false,
      valueEnum: {
        0: { text: '未审核', status: 'notReviewed' },
        1: { text: '已审核', status: 'reviewed' },
      },
    },
    {
      title: '上线状态',
      dataIndex: 'reviewStatus',
      hideInForm: false,
      valueEnum: {
        0: { text: '上线', status: 'onLine' },
        1: { text: '虾线', status: 'offLine' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];

  // updateWorker("create", {
  //   "realName": "范冰冰1",
  //   "telephone": "13800138003",
  //   "identity": "110101199003074098",
  //   "sex": "woman",
  //   "language": JSON.stringify(["普通话","粤语"]),
  //   "age": "18",
  //   "skillIdList": ["2"],
  //   // "skillIdList": ["清洗衣物"],
  //   "hospitalIdList": ["1"]
  // })

  // updateWorker("update", {
  //   "serverId": "1603464884538",
  //   "realName": "范冰冰2",
  //   "telephone": "13800138003",
  //   "identity": "110101199003074098",
  //   "sex": "woman",
  //   "language": JSON.stringify(["普通话","粤语"]),
  //   "age": "18",
  //   "skillIdList": ["2"],
  //   // "skillIdList": ["清洗衣物"],
  //   "hospitalIdList": ["1"]
  // })

  // updateLineStatus, updateReviewed, queryList, queryIncome

  // onLine,offLine
  // updateLineStatus({
  //   serverId: "1603464884538",
  //   onlineStatus: "onLine"
  // })

  // updateReviewed({
  //   serverId: "1603464884538",
  //   reviewed: "reviewed"
  // })

  // queryList({
  //   reviewStatus: "reviewed",
  //   // name: "",
  //   // onlineStatus: "onLine",
  //   pageSize: "10",
  //   pageNum: "1"
  // })

  // queryIncome({
  //   startDateTime: "2020-01-12 12:00:00",
  //   endDateTime: "2020-12-12 12:00:00",
  //   pageSize: "10",
  //   pageNum: "1"
  // })
  
  const aaa = (param) => {
    console.log(param, 8888)
      // queryList({
  //   reviewStatus: "reviewed",
  //   // name: "",
  //   // onlineStatus: "onLine",
  //   pageSize: "10",
  //   pageNum: "1"
  // })
  }
  
  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="护工表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => aaa({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
