import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

import RenderForm from '../RenderForm';

type FormProp = {
  layout: 'inline' | 'horizontal' | 'vertical' | undefined;
};

interface SearchFormProps {
  onSearch: Function;
  fieldData: any;
  diapatch?: any;
  classNames?: string;
  initFormValue?: any;
  layout?: FormProp['layout'];
}

export default function SearchForm({ layout = 'inline', fieldData, classNames, initFormValue = {}, onSearch }: SearchFormProps) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    setInitValue();
  }, [fieldData]);

  function setInitValue() {
    fieldData.forEach((it: any) => {
      if (typeof it.initialValue !== 'undefined') {
        initFormValue[it.itemName] = it.initialValue;
      }
    });
    form.setFieldsValue({ ...initFormValue });
  }

  function handleSubmit(values: object) {
    if (typeof onSearch === 'function') {
      onSearch(values);
    }
  }

  function handleReset() {
    form.resetFields();
    setInitValue();
  }

  return (
    <div className={classNames}>
      <Form form={form} layout={layout} onFinish={handleSubmit}>
        <RenderForm formData={fieldData} />
        <Form.Item className="btn-action-wrap">
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// class SearchForm extends Component<SearchFormProps, SearchFormState> {
//   constructor(props: SearchFormProps) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {}

//   // 提交表单
//   handleSubmit = (values: object) => {
//     const { onSearch } = this.props;
//     if (typeof onSearch === 'function') {
//       onSearch(values);
//     }
//   };

//   render() {
//     const { layout = 'inline', classNames, fieldData } = this.props;
//     return (
//       <div className={classNames}>
//         <Form layout={layout} onFinish={this.handleSubmit}>
//           <RenderForm formData={fieldData} />
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               搜索
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     );
//   }
// }

// export default SearchForm;
