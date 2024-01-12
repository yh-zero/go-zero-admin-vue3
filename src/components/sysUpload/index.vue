<template>
  {{ fileList }}
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
    // 判断value的类型
    // if (Array.isArray(props.value)) {
    //   fileList.value = props.value.map(item => {
    //     return {
    //       uid: item,
    //       name: item,
    //       status: 'done',
    //       url: item,
    //     };
    //   });
    // } else {
    //   fileList.value = [
    //     {
    //       uid: props.value,
    //       name: props.value,
    //       status: 'done',
    //       url: props.value,
    //     },
    //   ];
    // }
    // =========================
    // fileList.value = [
    //   {
    //     uid: '-2',
    //     lastModified: 1704767575228,
    //     name: 'PixPin_2024-01-09_10-32-50.png',
    //     size: 5488,
    //     type: 'image/png',
    //     percent: 100,
    //     status: 'done',
    //     response: {
    //       code: 200,
    //       message: '操作成功!',
    //       result: {
    //         fileImgUrl: 'https://go-zero-admin.oss-cn-beijing.aliyuncs.com/go-zero-admin/1704801029955_PixPin_2024-01-09_10-32-50.png',
    //       },
    //       returnData: null,
    //       success: true,
    //       timestamp: 1704801030,
    //     },
    //     xhr: '[object XMLHttpRequest]',
    //     thumbUrl:
    //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAADK5JREFUeF7tnXto3lcZx79v+jbpJekl9/ZtkqYkvaS50DTpmrSwWWInKrKLlylsDBEVZNM/lCkigjBQmTL/GHUM/xCdY1utjmFndS2rWjX2nqaBXsilaZr0kqS5tMmbvnlfeU7N0JkEck6zjef5/iCklD4n/X6e8/md8zu/t1sEvEiABGYkECEbEiCBmQlQEM4OEpiFAAXh9CABCsI5QAJ+BLiC+HFjlRECFMRIoxnTjwAF8ePGKiMEKIiRRjOmHwEK4seNVUYIUBAjjWZMPwIUxI8bq4wQoCBGGs2YfgQoiB83VhkhQEGMNJox/QhQED9urDJCgIIYaTRj+hGgIH7cWGWEAAUx0mjG9CNAQfy4scoIAQpipNGM6UeAgvhxY5URAhTESKMZ048ABfHjxiojBCiIkUYzph8BCuLHjVVGCFAQI41mTD8CFMSPG6uMEKAgRhrNmH4EKIgfN1YZIUBBjDSaMf0IUBA/bqwyQoCCGGk0Y/oRoCB+3FhlhAAFMdJoxvQjQEH8uLHKCAEKYqTRjOlHgIL4cWOVEQIUxEijGdOPAAXx48YqIwQoiJFGM6YfAQrix41VRghQECONZkw/AhTEjxurjBCgIEYazZh+BCiIHzdWGSFAQYw0mjH9CFAQP26sMkKAghhpNGP6EaAgftxYZYQABTHSaMb0I0BB/LixyggBCmKk0YzpR4CC+HFjlRECFMRIoxnTjwAF8ePGKiMEKIiRRjOmHwEK4seNVUYIUBAjjWZMPwIUxI8bq4wQoCBGGs2YfgQoiB83VhkhQEGMNJox/QhQED9urDJCgIIYaTRj+hGgIH7cWGWEAAUx0mjG9CNAQfy4scoIAQpipNGM6UeAgvhxY5URAhTESKMZ048ABfHjxiojBCiIkUYzph8BCuLHjVVGCFAQI41mTD8CFMSPG6uMEKAgRhrNmH4EKIgfN1YZIUBBjDSaMf0IUBA/bqwyQiASj8dTRrIyJgnMmQAFmTMyFlgiQEEsdZtZ50yAgswZGQssEaAglrrNrHMmQEHmjIwFlghQEEvdZtY5E6Agc0bGAksETAsyOTmJSCSCtLQ0Sz2fMWsqlUIymYR8n7qm+Mh3i5dJQeLxOPr6+tDf3+8EWbNmDXJzc92vRZo7d+5g0aJFZubDxMQErl69itHRUSQSCSeIfAkP+VqwYAGWL1+O/Px8LFy40AwXCWpOkMHBQZw9exYyKWKxGG7fvo2RkRFs3boVS5cuxZkzZzAwMIDS0lIUFxernwzj4+M4cuQIioqKkJ2djfT0dLeiihgiidwwhFVvb69jsXnzZieMlcuUIHKHPHHiBKLRqBMiIyPDbSkOHjyImpoa9/tHjx7FsmXLnCSVlZVOEs3bi66uLjf56+vrZ534Y2Nj7sayadMmdyOxcpkSROSQLcSWLVv+Z6tw+PBhrFu3DpcuXcLixYtRXV2Njo4OXL58GbW1tW57ofXq7Ox0E19WEMkuX7KNmlpBZPWQVXZ4eBi3bt1yIlEQhbNBVgQRRFaKvLw8l1C2D3JnlFVDfk8EEXlWrVrlVpZjx4651WTjxo0KidyNJILcvHnTbSlFAFllRQrJL1st2XJlZma6ZzJZbdavX09BNM6G06dPu2eNhoYGJ8bFixfdCiETQSaBPKR3d3ejrq7OySKTo6enB+3t7di5c6fabZYIcuPGDbdSznaaJwcbra2t7mbBFUShIbKNWrlypdtKiSxyyUO63B3lWUSePy5cuOBOtgoLC1FeXu62FSdPnsSuXbtUCyI8hIucUmVlZTkeIovcPESMoaEhdzMRHtu3b6cgCv3AoUOHkJOT4xovJ1nbtm37v6NcWVlEkLa2Nre1Kikpcduypqam+RVEtjPNrUh75YAcLCL5+d1I3lcJvA/vZ2QFkcwFBQXuqFdkkC2WsBBWsrWaOuK9du0aNmzYQEE0CiLbJTnSlDuhHFXKlmqmSybK8ePH3QmWPLDKpJjPK3KhG9Gv/QiRklXux6S6epF44Rmkyovm88e++wwiNwx59prtksMNOQLnM8i8t+SD+wGyRZAHb3mmkOeO2S7ZdsgDvBwHT/dyLDJ6G2l9/fckTOSNw0h79c/AZ5rujvf620h+9qNIPXT/PRk/WZiDVOaSaceSFUQmvggiq8h0WWWbJQcYcnORlZfPIPekLR++QeQhXU6sZB+9ZMn0E2bqby0TQr7koX3at+qJSUTG4vckZNreg1iwZy9QUXp3vLYOTH71USSnhAn8KanFGUB0+pd7IohsnUQM+S5bS3kOkWcyWTXkhEtOtuT5RLZdFRUVFCSwHx/actlbnzp1yskhjZ7p1EbumM3NzW6iyLHwvH9Wq68f0W/+DGnxCccumZGOxHNfBwpz5p2lCCIrq7z7ESHkeUSOe+XXIokcYsizm7xVl/clZWVlFGTeu/IB/gB5a9zS0oK1a9e6l2P/vZLIHfL69evuJaFMEJFD7qjzfsnnntp7EDl61j2kp+orkFoXA96HDwhKXuHR2NjoXhLOdMnD+/nz51FVVWXqc2qm3qS7u3My6bYSsu+Wt8WySsjEECFkEsgHFWUvLg/mFj6wKDzkBaC8F5LccvQtTGTLJSxkdZH3Q3JjkXcl8mc0f/TmvTcIc4JMAZBtlJxsyZZCTrdkOyGrhUwQOda0NAmEiTAQEeQET7ZYIodIIlsseS8kR97CyNplVhBrjWZePwIUxI8bq4wQoCBGGs2YfgQoiB83VhkhYESQBA68uhd1Dz+G0csdyClag8z3/NPRY2/uQ9r2T6A2L8NI64HhG1fQ/Pa/cGP5CEpyN6B0wxbkJdrw67c6MNTXhlQ0E4WxfETiY7jY0oy+tBjKK6rw9OMPmWFkRJAx/OR730Fm2U7kZWbgvgcfwMKhQUwsWITJ8XHkFeRisO86sktWo7/rMpZk5yI1NoKxRAI9x/bjXP4jeKIxX92k6O08hxd++H20oRi1+UBfPIaPVw/g9b+Mozj/DiZSK9BYW41UehLv/OEAiqrqsLmmAbt3VKpjMVMgO4L8+EXsaijDK/tb8NS3Hsf+l36BnkgMZZFeFDR8BOf/dBy7v9KIP+7vxqce3IK//v536Bgcwar0JG5XfQHf+KS+fzTV034Gv3zpN0hfX42a7ASGVlSgaPgf2N+aQnToLI53pePJR5pQuG4F3vlbKwqzFmPztgdQX/mfj8QY0MSUIE8/9SSeffZ5PPHFj+H5n/4KSwsq8e0v7cBzew5gR3k5Sh+tw74f7EF90078du9bKFidh7rSXLx5pRAvPvOwuukwcOUS9r32Mt5oGcJj9cswEbsfn66J4+cv/x2dgwnkZkaxPGcNSnPG0HLuKq72XUOs9n5898ufU8fC+Apipp9zCnr9SjdGk1GUZE3i4vBSLJwYRPv5f6KgZCtyY0XIz8pAZ0c7Vq8uRnp6FIMDN7EyLweW/itiRlaQOc0b/mESeJcABeFkIIFZCFAQTg8SoCCcAyTgR4AriB83VhkhQEGMNJox/QhQED9urDJCwOb/9MFIcxkznAAFCWfIERQToCCKm8to4QQoSDhDjqCYAAVR3FxGCydAQcIZcgTFBCiI4uYyWjgBChLOkCMoJkBBFDeX0cIJUJBwhhxBMQEKori5jBZOgIKEM+QIiglQEMXNZbRwAhQknCFHUEyAgihuLqOFE6Ag4Qw5gmICFERxcxktnAAFCWfIERQToCCKm8to4QQoSDhDjqCYAAVR3FxGCydAQcIZcgTFBCiI4uYyWjgBChLOkCMoJkBBFDeX0cIJUJBwhhxBMQEKori5jBZOgIKEM+QIiglQEMXNZbRwAhQknCFHUEyAgihuLqOFE6Ag4Qw5gmICFERxcxktnAAFCWfIERQToCCKm8to4QQoSDhDjqCYAAVR3FxGCydAQcIZcgTFBCiI4uYyWjgBChLOkCMoJkBBFDeX0cIJUJBwhhxBMQEKori5jBZOgIKEM+QIiglQEMXNZbRwAhQknCFHUEyAgihuLqOFE6Ag4Qw5gmICFERxcxktnAAFCWfIERQToCCKm8to4QQoSDhDjqCYAAVR3FxGCydAQcIZcgTFBCiI4uYyWjgBChLOkCMoJkBBFDeX0cIJUJBwhhxBMQEKori5jBZOgIKEM+QIiglQEMXNZbRwAhQknCFHUEyAgihuLqOFE6Ag4Qw5gmICFERxcxktnAAFCWfIERQToCCKm8to4QQoSDhDjqCYAAVR3FxGCydAQcIZcgTFBCiI4uYyWjgBChLOkCMoJkBBFDeX0cIJUJBwhhxBMQEKori5jBZOgIKEM+QIiglQEMXNZbRwAhQknCFHUEyAgihuLqOFE6Ag4Qw5gmIC/wa0oa2G6yZ4wAAAAABJRU5ErkJggg==',
    //   },
    // ];
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
  emits('update:value', successFileUrlList);
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
