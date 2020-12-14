import React from 'react';
import { Form } from 'antd';
import { DatePicker, Input, Select, InputNumber } from 'antd';
import shortid from 'shortid';

const FormItem = Form.Item;

const { RangePicker } = DatePicker;

// interface FormData {
//   type: string;
//   label: string;
//   itemName: string;
//   placeholder?: string;
//   selectOptions?: Array<any>;
//   required?: boolean;
//   rules?: Array<any>;
//   dateFormat?: string;
//   initialValue: any;
// }

interface RenderFormProps {
  formData: Array<any>;
}

// 表单生成器
function RenderForm(props: RenderFormProps) {
  const { formData } = props;
  if (!formData) {
    return null;
  }

  return (
    <>
      {formData.map((formItem: RenderFieldItem, index: number) => {
        const { label, type = 'input', itemName = 'inputName', placeholder = '', required = false, selectOptions = [], rules = [] } = formItem;
        const { dateFormat = 'YYYY/MM/DD', showTime = false } = formItem;
        const formItemRule = [
          {
            required,
            message: '不能为空',
          },
        ].concat(rules);

        switch (type) {
          case 'integer':
          case 'number':
            return (
              <FormItem name={itemName} key={index} label={label} rules={formItemRule}>
                <InputNumber placeholder={placeholder ? placeholder : type === 'integer' ? '整数' : ''} />
              </FormItem>
            );
          case 'select':
            const { width = 'auto' } = formItem;
            const isGotData = selectOptions.length > 0;
            return (
              <FormItem name={itemName} key={index} label={label} rules={formItemRule}>
                <Select
                  style={{ width }}
                  showSearch={selectOptions.length > 10}
                  placeholder={placeholder}
                  loading={!isGotData}
                  filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {selectOptions
                    .filter(it => it.visable !== false)
                    .map((d: FieldOptions) => (
                      <Select.Option key={shortid.generate()} value={d.value} disabled={d.disabled}>
                        {d.label}
                      </Select.Option>
                    ))}
                </Select>
              </FormItem>
            );
          case 'datetime':
            return (
              <FormItem name={itemName} key={index} label={label} rules={formItemRule}>
                <DatePicker format={dateFormat} showTime={showTime} />
              </FormItem>
            );
          case 'datetimeRange':
            return (
              <FormItem name={itemName} key={index} label={label} rules={formItemRule}>
                <RangePicker format={dateFormat} showTime={showTime} />
              </FormItem>
            );
          default:
            return (
              <FormItem name={itemName} key={index} label={label} rules={formItemRule}>
                <Input placeholder={placeholder} />
              </FormItem>
            );
        }
      })}
    </>
  );
}

export default RenderForm;
