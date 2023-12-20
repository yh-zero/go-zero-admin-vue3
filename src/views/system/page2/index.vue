<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
  {{ form.values }}
</template>

<script>
import { Input } from 'ant-design-vue';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/vue';

const { SchemaField } = createSchemaField({
  components: {
    Input,
  },
});

export default {
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm(),
      schema: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入',
              disabled: true,
              prefix: '<div>asd</div>',
            },
          },
        },
      },
    };
  },
};
</script>
