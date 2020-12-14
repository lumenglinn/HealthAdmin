import React, { useState, useEffect, Fragment } from 'react';
import { PageContainer, PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchForm from '@/components/SearchForm';
// import moment from 'moment';
// import CreateForm from '@/components/CreateForm';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Tooltip, Typography, Table, Row, Col, Button, message as Message, Popconfirm, notification } from 'antd';
import { queryIncome } from '../services/welcome.ts';
import { fmoney } from '@/utils/function.ts';
import styles from './Welcome.less';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC<{}> = () => {
  // 搜索选项
  let searchObj: any = {
    pageIndex: 1,
    pageSize: 10,
  };
  const [search, setSearch] = useState(searchObj);
  const [incomeData, setIncomeData] = useState({});
  // const [tableLoading, setTableLoading] = useState(true);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'realName',
      search: false,
    },
    {
      title: '日期范围',
      dataIndex: 'timeRange',
      filters: true,
      valueType: 'dateRange',
      initialValue: [null, null],
      hideInTable: true
    },
    {
      title: '支付状态',
      dataIndex: 'payState',
      search: false,
      render: (d: string) => (d === 'paid' ? "已支付" : "未支付"),
    },
    {
      title: '支付金额',
      dataIndex: 'money',
      search: false,
      render: (d: string) => (fmoney(d)),
    },
    {
      title: '退款金额',
      dataIndex: 'refundMoney',
      search: false,
      render: (d: string) => (fmoney(d)),
    },
    {
      title: '未退款金额',
      dataIndex: 'refundRestMoney',
      search: false,
      render: (d: string) => (fmoney(d)),
    },
    {
      title: '操作日期',
      dataIndex: 'payTime',
      search: false,
    },
    // {
    //   title: '身份证号',
    //   dataIndex: 'idCardNo',
    //   render: (d: string) => (`${d.slice(0, 3)}***********${d.substring(d.length - 4)}`),
    // },
    // {
    //   title: '操作',
    //   key: 'action',
    //   render: (d: any) => {
    //     const { exitId = 0, paymentState } = d;
    //     // 代付状态为成功或处理中的不展示按钮
    //     if (paymentState === 100 || paymentState === 200) {
    //       return null;
    //     }
    //     return (
    //       <div className="btn-action-wrap">
    //         <Button type="link" size="small" onClick={() => { handleManualExit(exitId) }}>
    //           手动退出
    //         </Button>
    //         <Popconfirm
    //           title="是否确认代付退出，确认后将通过中金支付渠道回款给用户？"
    //           onConfirm={() => {

    //           }}>
    //           <Button type="link" size="small" >
    //             代付退出
    //         </Button>
    //         </Popconfirm>
    //       </div>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    // setSelectedRowKeys([]);
    // setSetSelectedRows([]);
    // onGetList();
  }, []);

  async function onGetList(params) {
    const { timeRange, pageSize, pageNum } = params;
    const { data, msg, statusCode } = await queryIncome({
      startDateTime: timeRange[0] || "2020-01-01",
      endDateTime: timeRange[1] || "2120-01-01",
      pageSize,
      pageNum: pageNum || 1
    })

    if (statusCode === '10001') {
      setIncomeData(data.querySumIncomeSumVo)
      return {
        data: data.payFlowVoList,
        success: true,
        total: 9999,
      };
    } else {
      Message.error(msg);
    }
  }

  const { pageSize, pageIndex } = search;
  const { income = "", outcome = "" } = incomeData;

  return (
    <PageContainer>
      <ProTable
        headerTitle="财务账单"
        // actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => console.log(2)}>
          //   新建
          // </Button>,
          <div>总收入：{fmoney(income)}元</div>,
          <div>总支出：{fmoney(outcome)}元</div>
        ]}
        // request={(params, sorter, filter) => handleSearch({ ...params, sorter, filter })}
        request={async (
          params: {
            timeRange: Array<string>;
            pageSize: number;
            pageNum: number;
          },
          // sort,
          // filter,
        ) => onGetList(params)}
        columns={columns}
      />
    </PageContainer>
  )
};

export default Welcome;
