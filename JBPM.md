！# JBPM工作流
<!-- @author DHJT 2018-11-23 -->
`Java Business Process Management`（业务流程管理）
jBPM项目从设计上就没有考虑“回退”、“取回”、“会签”、“委派”等业务场景

## 样例
- [JBPM工作流][1]

## 获取流程信息
```java
List<Task> list = App.getJBPM().getTaskService()
                    .createTaskQuery().assignee("部门领导").list();
Task task = App.getJBPM().getTaskService().getTask("40053");
List<HistoryTask> historyTask=App.getJBPM().getHistoryService().createHistoryTaskQuery().list();

String id = App.getJBPM().getExecutionService().findExecutionById(executionId).getProcessDefinitionId();
RepositoryService repositoryService = App.getJBPM().getRepositoryService();
ProcessDefinition definition = repositoryService.createProcessDefinitionQuery().processDefinitionId(id).uniqueResult();
ProcessDefinitionImpl definitionimpl = (ProcessDefinitionImpl)definition;
List<? extends Activity> list2 = definitionimpl.getActivities();
for (Activity activity : list2) {
    System.out.println(activity.getName());
}
```
### 获取ProcessEngine的方法
```java
// 1.使用Configuration获取默认配置
private static ProcessEngine processEngine = Configuration.getProcessEngine();
// 2.自定义配置文件
private static ProcessEngine processEngine = new Configuration()
                          .setResource("jbpm.cfg.xml")  // 自定义配置文件
                          .buildProcessEngine();// 创建流程引擎
```
### ProcessEngine的常用方法
- getRepositoryService

       流程资源服务接口。管理流程定义的相关操作(部署,查询,删除等)。

```java
// 通过调用getRepositoryService()资源服务，提供部署流程的一系列方法，来实现流程的部署。
processEngine.getRepositoryService() // 资源服务接口
             .createDeployment() // 创建部署流程
             .addResourceFromClasspath("helloworld/helloworld.jpdl.xml") // 加载流程文件
             .addResourceFromClasspath("helloworld/helloworld.png") // 加载流程图片
             .deploy();// 执行
```
- getExecutionService

       流程执行服务接口。提供启动流程实例、推进、删除等操作

       例如：
processEngine.getExecutionService().startProcessInstanceByKey("helloworld");//启动helloworld流程
        通过调用getExecutionService执行服务，获取流程启动的方法，除了startProcessInstanceByKey方法之外还有startProcessInstanceById等，可以根据指定条件进行启动。

- getTaskService

    人工任务服务接口。提供对任务的创建、提交、查询、保存、删除等操作。

```java
// 查询，根据用户id
List<Task> taskList = processEngine.getTaskService().findPersonalTasks(userId);
//处理，根据任务id
processEngine.getTaskService().completeTask(taskId);
        使用的是TaskService接口，主要是对任务列表进行操作，此外还有deleteTask进行删除任务等。
```
- HistoryService

       流程历史服务接口。提供对任务的管理操作。提供对流程历史库中历史流程实例、历史活动实例等记录的查询。

List<HistoryTask> historyTask=processEngine.getHistoryService().createHistoryTaskQuery().list();
        获取历史任务列表。

- ManagementService

      流程管理控制服务接口

- IdentityService

    身份认证服务接口。提供对流程用户、用户组管理。

### 获取流程节点
```java
public Map getStatus(String executionId){
    Set<String> set = App.getJBPM().getExecutionService().createProcessInstanceQuery().processInstanceId(executionId).uniqueResult().findActiveActivityNames();
    String id = App.getJBPM().getExecutionService().findExecutionById(executionId).getProcessDefinitionId();
    RepositoryService repositoryService = App.getJBPM().getRepositoryService();
    ProcessDefinition definition = repositoryService.createProcessDefinitionQuery().processDefinitionId(id).uniqueResult();
    ProcessDefinitionImpl definitionimpl = (ProcessDefinitionImpl)definition;
    List<? extends Activity> list2 = definitionimpl.getActivities();
    List list1 = new ArrayList();
    getWorkflowDetil("开始", list1, list2, set);
    Map map = new HashMap();
    map.put("status", set);
    map.put("all", list1);
    return map;
}
public void getWorkflowDetil(String str, List<String> all, List<? extends Activity> list, Set<String> set) {
    if ("结束".equals(str)) {
        all.add(str);
    } else {
        for (Activity activity : list) {
            if (str.indexOf(activity.getName()) > -1) {
                if (!"分支".equals(activity.getName())) {
                    all.add(activity.getName());
                }
                getWorkflowDetil(activity.getOutgoingTransitions().get(0).getDestination().getName(), all, list, set);
            }
        }
    }
}
```

[1]: https://www.cnblogs.com/jingpeipei/p/6150409.html 'JBPM工作流'
[2]: https://download.jboss.org/jbpm/release/6.5.0.Final/jbpm-6.5.0.Final-bin.zip 'jbpm-6.5.0.Final-bin.zip'
[3]: https://blog.csdn.net/feinifi/article/details/53576505 'Eclipse安装jbpm6插件并测试Hello示例'