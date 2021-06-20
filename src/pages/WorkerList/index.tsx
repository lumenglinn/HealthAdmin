import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message as Message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { Link, history } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
// import ProDescriptions from '@ant-design/pro-descriptions';
// import CreateForm from './components/CreateForm';
// import UpdateForm, { FormValueType } from './components/UpdateForm';
// import { TableListItem } from './data';
import { updateWorker, updateLineStatus, updateReviewed, queryList } from './service';

const TableList: React.FC<{}> = () => {
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  // const [row, setRow] = useState<TableListItem>();
  // const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    // {
    //   title: 'ID',
    //   dataIndex: 'serverId',
    //   search: false,
    // },
    {
      title: '联系电话',
      dataIndex: 'telephone',
      search: false,
    },
    {
      title: '身份证号',
      dataIndex: 'identity',
      search: false,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      search: false,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (d: string) => (`${d === 'man' ? "男" : "女"}`),
      search: false,
    },
    {
      title: '服务次数',
      dataIndex: 'serverNum',
      search: false,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      initialValue: 'reviewed',
      valueEnum: {
        reviewed: { text: '已审核', status: 'reviewed' },
        notReviewed: { text: '未审核', status: 'notReviewed' },
      },
    },
    {
      title: '上架状态',
      dataIndex: 'onlineStatus',
      render: (d: string) => (`${d === 'onLine' ? "在线" : "下线"}`),
      initialValue: 'onLine',
      filters: true,
      valueEnum: {
        onLine: { text: '在线', status: 'onLine' },
        offLine: { text: '下线', status: 'offLine' },
      },
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      render: (d: any) => {
        const { reviewStatus, onlineStatus, serverId } = d;
        return (
          <div className="btn-action-wrap">
            <Button size="small" onClick={() => history.push(`/workerList/${serverId}`)}>编辑</Button>
            {
              reviewStatus === "notReviewed" && <Button type="primary" size="small" onClick={() => { updateWorkerReview(d) }}>审核通过</Button>
            }
            {/* "reviewed" */}
            {/* {
              reviewStatus === null && <Button type="link" size="small" onClick={() => { updateWorkerReview(d) }}>审核不通过</Button>
            } */}
            {
              onlineStatus === "offLine" && <Button type="primary" size="small" onClick={() => { updateWorkerOnline(d) }}>上架</Button>
            }
            {
              onlineStatus === "onLine" && <Button type="danger" size="small" onClick={() => { updateWorkerOnline(d) }}>下架</Button>
            }
            {/* <Popconfirm
              title="是否确认代付退出，确认后将通过中金支付渠道回款给用户？"
              onConfirm={() => {

              }}>
              <Button type="link" size="small" >
                代付退出
            </Button>
            </Popconfirm> */}
          </div>
        );
      },
    },
  ];

  // 获取护工列表
  async function onGetList(params = {}) {
    const { realName, reviewStatus, onlineStatus, pageSize, pageNum } = params;
    const { data, msg, statusCode, totalSize } = await queryList({
      name: realName,
      reviewStatus,
      onlineStatus,
      pageSize: pageSize || 20,
      pageNum: pageNum || 1
    })

    if (statusCode === '1') {
      return {
        data: data,
        success: true,
        total: totalSize,
      };
    } else {
      Message.error(msg);
    }
  }

  // 更新护工审核状态
  async function updateWorkerReview(params) {
    const { serverId, reviewStatus } = params;
    const { msg, statusCode } = await updateReviewed({
      serverId,
      reviewStatus: reviewStatus === "reviewed" ? "notReviewed" : "reviewed"
    })

    if (statusCode === '1') {
      Message.success('审核成功', 2, actionRef.current.reload);
    } else {
      Message.error(msg);
    }
  }

  // 更新护工上下架状态
  async function updateWorkerOnline(params) {
    const { serverId, onlineStatus } = params;
    const { msg, statusCode } = await updateLineStatus({
      serverId,
      onlineStatus: onlineStatus === "onLine" ? "offLine" : "onLine"
    })

    if (statusCode === '1') {
      Message.success('操作成功', 2, actionRef.current.reload);
    } else {
      Message.error(msg);
    }
  }

  return (
    <PageContainer>
      <ProTable
        headerTitle="财务账单"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="toolBar_new" onClick={() => history.push('/workerList/new')}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          params: {
            realName?: string,
            reviewStatus?: string,
            onlineStatus?: string,
            pageSize: number;
            pageNum: number;
          },
          // sort,
          // filter,
        ) => onGetList(params)}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
