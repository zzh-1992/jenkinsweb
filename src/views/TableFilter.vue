<template>
  <el-button @click="resetDateFilter">reset date filter</el-button>
  <el-button @click="clearFilter">reset all filters</el-button>
  <el-table
    ref="filterTable"
    row-key="date"
    :data="tableData"
    style="width: 100%"
    @filter-change="_filterChange"
  >
    <el-table-column
      prop="date"
      label="Date"
      sortable=""
      width="180"
      column-key="date"
      :filters="[
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' },
      ]"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="name"
      label="Name"
      :filters="[
        { text: 'Tom1', value: 'Tom1' },
        { text: 'Tom2', value: 'Tom2' },
        { text: 'Tom3', value: 'Tom3' },
        { text: 'Tom4', value: 'Tom4' },
        { text: 'Tom5', value: 'Tom5' },
      ]"
      column-key="name"
      :filter-method="filterName"
      filter-placement="bottom-end"
      width="180"
    />
    <el-table-column prop="address" label="Address" :formatter="formatter" />

    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'A', value: 'A' },
        { text: 'B', value: 'B' },
        { text: 'C', value: 'C' },
        { text: 'D', value: 'D' },
        { text: 'E', value: 'E' },
      ]"
      column-key="tag"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.tag === 'Home' ? '' : 'success'"
          disable-transitions
          >{{ scope.row.tag }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      // 定义数组存储用户的选项(想看到的值)
      cName: [],
      cTag: [],
      // 列表数据
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom1",
          address: "No. 189, Grove St, Los Angeles",
          tag: "A",
        },
        {
          date: "2016-05-02",
          name: "Tom2",
          address: "No. 189, Grove St, Los Angeles",
          tag: "A",
        },
        {
          date: "2016-05-04",
          name: "Tom3",
          address: "No. 189, Grove St, Los Angeles",
          tag: "B",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          tag: "C",
        },
        {
          date: "2016-05-05",
          name: "TomCat",
          address: "No. 199, Grove St, Los Angeles",
          tag: "D",
        },
        {
          date: "2016-05-05",
          name: "TomCatF",
          address: "No. 199, Grove St, Los Angeles",
          tag: "E",
        },
      ],
    };
  },
  methods: {
    _filterChange(filter) {
      // 该次选取的条件
      if (filter.tag) {
        this.cTag = filter.tag.toString().split(",");
        console.log("cTag:" + this.cTag);
      }
      if (filter.name) {
        this.cName = filter.name.toString().split(",");
        console.log("cName:" + this.cName);
      }
      this.totalSize = this.$refs.filterTable.data.length;
      console.log("_filterChange:" + this.totalSize);
    },

    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      // 清空用户的过滤条件
      this.cName = [];
      this.cTag = [];
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      console.log("column:" + column);
      return row.address;
    },
    filterName(value, row) {
      return row.name === value;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      var equal = row[property] === value;
      console.log("value:" + value);
      console.log("row:" + row);
      console.log("column:" + column);
      return equal;
    },
  },
};
</script>
