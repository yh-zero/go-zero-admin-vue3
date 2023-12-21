<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema"> </SchemaField>
    <FormConsumer>
      <template #default="{ form }">
        {{ form.values }}
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/vue';
import { FormItem } from 'ant-design-vue';
const { SchemaField } = createSchemaField({
  components: {
    Input,
    FormItem,
  },
});

export default {
  components: { FormProvider, SchemaField, FormConsumer },
  data() {
    return {
      form: createForm(),
      schema: {
        type: 'object',
        properties: {
          username: {
            name: '用户名',
            title: '必填',
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          password: {
            type: 'string',
            'x-component': 'Input',
          },
        },
      },
    };
  },
};
</script>
