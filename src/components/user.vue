<template>
  <div class="user">
    <!-- 树形组织结构 -->
    <div class="tree">
        <el-input  v-model="input" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-tree :data="tree.treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
            input:'',
            defaultProps: {
                children: 'lowers',
                label: 'name'
            },
            tree: {
                treeData:[],
                copytreeDate:[]
            },
            tableData: [],
        }
    },
    watch:{
        'input':{
            handler(newVal){
                console.log(newVal);
                console.log(newVal!='');
                if(newVal!=''){
                    this.tree.treeData = this.tree.copytreeDate.filter(word=>word==newVal)
                }else{
                    this.tree.treeData = this.tree.copytreeDate
                }
                console.log(this.tree);
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
            
            // 获取该组织下的用户
            
            this.$axios
                .get(`http://115.159.154.194/police-support-platform/users/by-organ-unit?organUnitId=${data.id}`)
                .then(res=>{
                    this.tableData = res.data
                    console.log("this.tableData",res);
                })
        },
        // 获取树形组织数据
        gettree(){
            this.$axios
                .get('http://115.159.154.194/police-support-platform/organ-units/tree')
                .then(response => {
                    this.tree.treeData.push(response.data)
                    this.tree.copytreeDate.push(response.data)
                    console.log("this.tree",response.data);
                    })
        },
        // 获取用户数据
        getuser(){
            this.$axios
                .get('http://115.159.154.194/police-support-platform/users/page')
                .then(res => {
                    this.tableData = res.data.content
                    console.log("this.tableData",res);
                    })
        },
    },
    created(){
        console.log("data");
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
