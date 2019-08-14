# Spring 技术栈
<!-- @author DHJT 2019-07-30 -->

## Spring
- 配置 ContextLoaderListener 启动applicationContext

## SpringMVC
- `DispatcherServlet`

## SpringSecurity
## SpringBoot
作用：在启动Web容器时，自动装配Spring applicationContext.xml的配置信息。
 * DispatcherServlet的上下文仅仅是Spring MVC的上下文，而Spring加载的上下文是通过ContextLoaderListener来加载的。
 * 一般spring web项目中同时会使用这两种上下文，前者仅负责MVC相关bean的配置管理（如ViewResolver、Controller、MultipartResolver等），
 * 后者则负责整个spring相关bean的配置管理（如相关Service、DAO等）。