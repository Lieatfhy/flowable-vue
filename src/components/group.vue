<template>
  <div class="group">
    <!-- 树形组 -->
    <div class="tree">
        <el-input  v-model="input" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button  type="text" @click="groupEdit('add')">新增组</el-button>
        <el-table
            :data="group"
            style="width: 100%"
            align="left"
            @row-click="handleNodeClick"
            :highlight-current-row="true"
            max-height="400">
            <el-table-column
                prop="name"
                align="left"
                style="margin-left:20px">
            </el-table-column>
        </el-table>
    </div>
    <div class="usertable">
        <div class="title">
            <div  style="margin-left:10px;width:300px;position: absolute;">
                <span>用户列表</span>
                <el-button  v-if="show" style="margin-left:10px;font-size: 16px;" type="text" @click="GroupMember('add')">增加组成员</el-button>
            </div>
            <div style="float:right;margin-right:10px;width:300px;">
            <el-button  v-if="show" type="danger" icon="el-icon-delete" style="float:right;margin:10px 10px 10px 10px" @click="deletetip=true"></el-button>
            <el-button  v-if="show" type="primary" icon="el-icon-edit" style="float:right;margin:10px 10px 10px 10px" @click="groupEdit('edit')"></el-button>
        </div></div>
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
                prop="fullName"
                label="姓名"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="email"
                label="组织机构"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="email"
                label="警号"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                v-if="show"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="decectMember(scope.row)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <div  style="margin:10px auto">
                <span  style="margin:10px auto;width:100px">名称</span>
                <el-input v-model="addGroup.name" autocomplete="off"></el-input>
            </div>
            <div style="margin:10px auto" v-if="!editgroup">
                <span style="margin-right:10px;width:100px">I D</span>
                <el-input v-model="addGroup.id" autocomplete="off"></el-input>
            </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd">取 消</el-button>
            <el-button type="primary" @click="groupsucess">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deletetip">
        <div>确认要删除id为{{this.clickgroup.id}},名称为{{this.clickgroup.name}}的组吗</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="deletetip=false">取 消</el-button>
            <el-button type="primary" @click="delectgroup">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deletetip2">
        <div>确认要删除{{this.clickgroup.name}}的组中的成员{{this.clickmember.name}}吗</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="deletetip2=false">取 消</el-button>
            <el-button type="primary" @click="delectMemberFucrion">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="增加组成员" :visible.sync="addgroupMember">
        选择用户:<el-select  v-model="addgroupmember.name" filterable placeholder="" @change="selectChange">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.fullName"
                :value="item.id"
                >
            </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addgroupMember=false;addgroupmember.name='';addgroupmember.id=''">取 消</el-button>
            <el-button type="primary" @click="addmember">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
    import { Message } from 'element-ui';
    export default {
        name: 'group',
        data () {
            return {
                input:'',
                clickgroup:{
                    id:'',
                    name:''
                },//所选择的组
                addGroup:{
                    id:'',
                    name:''
                },//增加组中的id+name
                clickmember:{
                    id:'',
                    name:''
                },//组中删除的成员id+name
                addgroupMember:false,//是否显示增加组成员的dialog
                addgroupmember:{
                    id:'',
                    name:''
                },//组成员的id+name
                deletetip2:false,//是否显示删除组成员提示
                deletetip:false,//是否显示删除组提示
                dialogTitle:'',//增加/修改组的标题
                editgroup:false,//是否是修改组
                show:false,//是否显示组删除和修改的按钮
                dialogFormVisible:false,//是否显示增加组和修改组的dialog
                group: [],//组列表
                options:[],//select列表
                tableData: [],//组用户列表
            }
                
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
                this.show = true
                this.clickgroup.id = data.id
                this.clickgroup.name = data.name
                // 获取该组下的用户
                this.$axios
                    .get(`http://localhost:9090/modeler/app/rest/admin/groups/${data.id}/users?page=0&pageSize=50`)
                    .then(res=>{
                        this.tableData = res.data.data
                        console.log("this.tableData",this.tableData);
                    })
            },
            selectChange(data){
                this.addgroupmember.id=data
                console.log("selectChange+data");
            },
            // 新增、编辑组
            groupsucess(){
                if(this.editgroup == false){
                    this.$axios
                        .post(`http://localhost:9090/modeler/app/rest/admin/groups`,{
                            id:this.addGroup.id,
                            name:this.addGroup.name
                        })
                        .then(res=>{
                            this.dialogFormVisible = false
                            this.addGroup.id = ''
                            this.addGroup.name = ''
                            this.getgroup()
                            this.$message.success('新增成功')
                        })
                        .catch(err=>{
                            console.log('err',err.message);
                            this.$message.error(err.message);
                        })
                }else{
                    this.$axios
                        .put(`http://localhost:9090/modeler/app/rest/admin/groups/${this.clickgroup.id}`,{
                            name:this.addGroup.name
                        })
                        .then(res=>{
                            this.dialogFormVisible = false
                            this.clickgroup.name = this.addGroup.name
                            this.addGroup.id = ''
                            this.addGroup.name = ''
                            this.getgroup()
                            this.$message.success('编辑成功')
                        })
                        .catch(err=>{
                            console.log('err',err.message);
                            this.$message.error(err.message);
                        })
                }
            },
            // 新增、编辑组弹框
            groupEdit(data){
                if(data=='add'){
                    this.dialogTitle = '新增组';
                    this.dialogFormVisible = true
                    this.editgroup = false;
                }else if(data == 'edit'){
                    this.addGroup.name = this.clickgroup.name
                    this.dialogTitle = '编辑组';
                    this.editgroup = true;
                    this.dialogFormVisible = true
                }
            },
            // 组成员增加dialog
            GroupMember(data){
                if(data=='add'){
                    this.addgroupMember=true
                    this.$axios
                        .get('http://localhost:9090/modeler/app/rest/admin/users?sort=idAsc&start=0')
                        .then(res=>{
                            this.options=res.data.data
                            console.log("this.options",this.options);
                        })
                        .catch(err=>{
                            this.$message.error(err);
                        })
                }
            },
            // 组成员增加请求
            addmember(){
                // http://localhost:9090/modeler/app/rest/admin/groups/3/members/1
                this.$axios
                        .post(`http://localhost:9090/modeler/app/rest/admin/groups/${this.clickgroup.id}/members/${this.addgroupmember.id}`)
                        .then(res=>{
                            this.addgroupMember = false
                            this.addgroupmember.id = ''
                            this.addgroupmember.name = ''
                            this.handleNodeClick(this.clickgroup)
                            this.$message.success('新增成功')
                        })
                        .catch(err=>{
                            console.log('err',err.message);
                            this.$message.error(err.message);
                        })
            },
            // 获取组数据
            getgroup(){
                this.$axios
                    .get('http://localhost:9090/modeler/app/rest/admin/groups?functional=true')
                    .then(response => {
                        this.group=response.data
                        console.log("this.group",response.data);
                    })
                    .catch(err=>{
                        this.$message.error(err);
                    })
            },
            // 获取用户数据
            getuser(){
                this.$axios
                    .get('http://localhost:9090/modeler/app/rest/admin/users?sort=idAsc&start=0')
                    .then(res => {
                        this.tableData = res.data.data
                        console.log("this.tableData",res);
                    })
            },
            // 删除组中用户dialog
            decectMember(data){
                console.log("decectMember+data",data);
                this.deletetip2 = true
                this.clickmember.id = data.id
                this.clickmember.name = data.fullName
            },
            // 删除组中用户请求
            delectMemberFucrion(){
                this.$axios
                    .delete(`http://localhost:9090/modeler/app/rest/admin/groups/${this.clickgroup.id}/members/${this.clickmember.id}`)
                    .then(res=>{
                            this.handleNodeClick(this.clickgroup)
                            this.deletetip2 = false
                            this.$message.success('删除成功')
                    })
            },
            cancelAdd(){
                this.dialogFormVisible = false
                this.addGroup.id = ''
                this.addGroup.name = ''
            },
            delectgroup(){
                this.$axios
                        .delete(`http://localhost:9090/modeler/app/rest/admin/groups/${this.clickgroup.id}`)
                        .then(res=>{
                            this.clickgroup.id = '',
                            this.$message.success("删除成功")
                            this.deletetip = false
                            this.getuser()
                            this.getgroup()
                        })
                        .catch(err=>{
                            console.log('err',err.message);
                            this.$message.error(err.message);
                        })
            }
        },
        created(){
            console.log("data");
            this.getgroup()
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
    .group{
        width: 100%;
    }
    .tree{
        width:400px;
        border:1px solid black;
        height: 500px;
        float: left;
        position:absolute
    }
    .tree .group_div{
        text-align:left;
        height:50px;
        width:400px;
        line-height:50px;
    }
    .usertable{
        border:1px solid black;
        height: 500px;
        float: left;
        margin-left: 410px;
        width: 938px;
    }
    .usertable .title{
        float: left;
        width: 100%;
        background-color:#e8edf1;
        height:64px;
        text-align: left;
        line-height: 64px;
        font-size: 26px;
        font-weight: bold;
    }
</style>
