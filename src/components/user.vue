<template>
  <div class="user">
    <!-- 树形组织结构 -->
    <div class="tree">
        <el-input  v-model="filterText" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-tree :data="tree" ref="tree" :filter-node-method="filterNode" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="usertable">
        <div class="title">用户列表</div>
        <el-table
            :data="tableData"
            style="width: 100%"
            align="center"
            max-height="400">
            <el-table-column
                prop="id"
                label="ID"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="policeSign"
                label="警号"
                align="center"
                width="400">
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'user',
    data () {
        return {
            filterText:'',
            defaultProps: {
                children: 'lowers',
                label: 'name'
            },
            tree: [],
            tableData: [],
        }
    },
    watch:{
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        handleNodeClick(data) {
            // 获取该组织下的用户
            this.$axios
                .get(`http://localhost:9090/modeler/users/by-organ-unit?organUnitId=${data.id}`)
                .then(res=>{
                    this.tableData = res.data
                })
        },
        // 获取树形组织数据
        gettree(){
            this.$axios
                .get('http://localhost:9090/modeler/organ-units/tree')
                .then(response => {
                    this.tree.push(response.data)
                    })
        },
        // 获取用户数据
        getuser(){
            this.$axios
                .get('http://localhost:9090/modeler/users/page')
                .then(res => {
                    this.tableData = res.data.content
                    })
        },
    },
    created(){
        this.gettree()
        this.getuser()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-input {
    width: 200px;
    float: center;
    }
    .user{
        width: 100%;
    }
    .tree{
        width:400px;
        border:1px solid black;
        height: 500px;
        float: left;
        position:absolute
    }
    .usertable{
        border:1px solid black;
        height: 500px;
        float: left;
        margin-left: 410px;
        width: 938px;
    }
    .usertable .title{
        background-color:#e8edf1;
        height:64px;
        text-align: center;
        line-height: 64px;
        font-size: 26px;
        font-weight: bold;
        width: 100%;
    }
</style>
