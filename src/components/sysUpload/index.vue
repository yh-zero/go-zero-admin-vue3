<template>
  <a-upload :headers="headers" name="file_img" v-model:file-list="fileList" action="/v1/sys/base/uploadFileImg" :list-type="listType" :multiple="true" @change="handleChange" @preview="handlePreview">
    <a-button v-if="listType != 'picture-card' && fileList && fileList.length < fileNumber">
      <upload-outlined></upload-outlined>
      {{ btnText }}
    </a-button>
    <upload-outlined v-if="listType == 'picture-card' && fileList && fileList.length < fileNumber"></upload-outlined>
  </a-upload>
  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>
<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const headers = {
  Authorization: userStore.getToken,
};
interface Props {
  btnText?: string; //按钮文字
  listType: 'text' | 'picture' | 'picture-card'; //文件类型
  fileNumber?: number; //文件数量
  value: string | string[];
}
const props = withDefaults(defineProps<Props>(), {
  btnText: '上传',
  listType: 'text',
  fileNumber: 1,
});
// ====== 回显处理 ======
onMounted(() => {
  if (props.value) {
    // // 判断value的类型
    if (Array.isArray(props.value)) {
      fileList.value = props.value.map(item => {
        return {
          uid: new Date().getTime() + '',
          name: item,
          status: 'done',
          response: {
            code: 200,
            result: { fileImgUrl: item },
          },
          url: item,
        };
      });
    } else {
      fileList.value = [
        {
          status: 'done',
          response: {
            code: 200,
            result: { fileImgUrl: props.value },
          },
          uid: props.value,
          name: props.value,
          url: props.value,
        },
      ];
    }
  } else {
    fileList.value = [];
  }
});
const fileList = ref<UploadProps['fileList']>([]);

const emits = defineEmits(['update:value']);

const handleChange = (info: UploadChangeParam) => {
  if (info.fileList.length >= props.fileNumber) {
    maxFileNum(info);
  } else {
    fileList.value = [...info.fileList];
  }
  callBackValue(info);
};

function callBackValue(info: UploadChangeParam) {
  const successFileList: UploadProps['fileList'] = [];
  const errorFileNameList: string[] = [];
  const successFileUrlList: string[] = [];
  info.fileList.forEach(file => {
    if (file.status == 'done') {
      if (file.response && file.response.code == 200) {
        successFileList.push(file);
        successFileUrlList.push(file?.response?.result?.fileImgUrl || '');
      } else {
        errorFileNameList.push(file.name || '');
      }
    }
  });
  if (errorFileNameList.length > 0) {
    message.error(`文件${errorFileNameList.join(',')}上传失败`);
    setTimeout(() => {
      fileList.value = info.fileList.filter(file => !errorFileNameList.includes(file.name));
    }, 1000);
  }
  fileList.value = [...info.fileList];
  if (Array.isArray(props.value)) {
    emits('update:value', successFileUrlList);
  } else {
    emits('update:value', successFileUrlList[0]);
  }
}

function maxFileNum(info: UploadChangeParam) {
  let resFileList = [...info.fileList];
  resFileList = resFileList.slice(-props.fileNumber);
  resFileList = resFileList.map(file => {
    if (file.response) {
      file.url = file.response.url;
    }
    return file;
  });

  fileList.value = resFileList;
}
// ======= 缩略图 =======
const previewVisible = ref(false);
const previewTitle = ref('');
const previewImage = ref('');
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
</script>
