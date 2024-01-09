<template>
  <div>
    <a-button type="primary" @click="showAddApi('新增用户', true)"
      ><template #icon> <PlusOutlined /> </template>新增用户</a-button
    >

    <SysTable rowKey="ID" ref="tableRef" v-model:data="dataSource" :getList="getUserList" class="mt-3" :dataSource="dataSource" :columns="columns" :asyncListCallback="asyncListCallback">
      <template #tableSlot="{ text, column, record }">
        <!--  -->
        <template v-if="column.slotName == 'headerImg'">
          <img v-show="text" class="w-[30px] h-[30px] rounded-full" :src="text" alt="" />
        </template>
        <!--  -->
        <template v-if="column.slotName == 'authorities'">
          <a-tree-select
            v-model:value="record.selectIds"
            @change="(val:number[],label:any,extra:any) =>{selectChange(val,record,extra)}"
            :fieldNames="{
              label: 'authorityName',
              value: 'authorityId',
            }"
            style="width: 100%"
            tree-checkable
            :allowClear="false"
            tree-default-expand-all
            :height="233"
            :tree-data="authorityListTree"
            :max-tag-count="1"
            tree-node-filter-prop="title"
          >
            <template #authorityName="{ authorityName }">
              <template>{{ authorityName }}</template>
            </template>
          </a-tree-select>
        </template>
        <!--  -->
        <template v-if="column.slotName == 'enable'">
          <a-switch @change="(checked:number) =>{enableUser(checked,record.ID)}" :checkedValue="1" :unCheckedValue="0" v-model:checked="record.enable" />
        </template>
        <!--  -->
        <template v-if="column.slotName == 'edit'">
          <div class="w-[300px]">
            <a-button type="link" @click="showAddApi('编辑', false, record)"
              ><template #icon> <EditOutlined /> </template>编辑</a-button
            >
            <a-button type="link"
              ><template #icon> <DeleteOutlined /> </template>删除</a-button
            >
          </div>
        </template>
      </template>
    </SysTable>
    <AddModal :authorityListTree="authorityListTree" :isAdd="isAdd" @getList="getList" :title="title" v-model:open="showAddModal" :selectItem="selectItem"></AddModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import SysTable from '@/components/sysTable/index.vue';
import { getUserList } from '@/api/modules/userList';
import AddModal from './modules/addModal.vue';
import { UserListType } from '@/types/userList';
import { AuthorityType } from '@/types/authority';
import { editUserList } from '@/api/modules/userList';
import { useSelectHooks } from '@/hooks/baseSelectHooks';
import { message } from 'ant-design-vue';

const { authorityListTree, getAuthList } = useSelectHooks();
onMounted(() => {
  getAuthList();
});

// ========= 【弹窗】 编辑 ｜ 新增  =========
const showAddModal = ref(false);
const title = ref('');
const isAdd = ref(false); //是否新增
const selectItem = ref();
function showAddApi(_title: string, _isAdd: boolean, selectData?: UserListType) {
  selectItem.value = selectData;
  showAddModal.value = true;
  isAdd.value = _isAdd;
  title.value = _title;
}
// ============= 列表接口数据 =============
const dataSource = ref();
const tableRef = ref();
function asyncListCallback() {
  dataSource.value = dataSource.value.map((res: UserListType) => {
    res.selectIds = res.authorities.map((res: AuthorityType) => {
      return res.authorityId;
    });
    return res;
  });
}
// 手动请求
function getList() {
  tableRef.value.toGetList();
}
const columns = [
  { title: '头像', slotName: 'headerImg', dataIndex: 'headerImg' },
  { title: 'id', dataIndex: 'ID', key: 'ID' },
  { title: '用户名', dataIndex: 'userName' },
  { title: '昵称', dataIndex: 'nickName' },
  { title: '手机号', dataIndex: 'phone' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '用户角色', slotName: 'authorities', width: 250 },
  { title: '启用', dataIndex: 'enable', slotName: 'enable' },
  { title: '操作', slotName: 'edit', width: 300 },
];
// ======== 用户角色设置 ========
function selectChange(list: number[], item: UserListType, label: any) {
  if (list.length < 1) {
    message.error('最少一个角色');
    item.selectIds = [label.triggerValue];
    return;
  }
  editUserList({
    authorityIds: list,
    ID: item.ID,
  });
}
// ======== 用户启用关闭 ========
function enableUser(checked: number, id: number) {
  editUserList({
    ID: id,
    enable: checked, //用户是否被冻结 1正常 2冻结
  });
}
</script>

<style scoped></style>
