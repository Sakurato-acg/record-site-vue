<!-- 文章详情模块 -->
<template>
  <!-- 文章内容 -->
  <mavon-editor
    ref="md"
    :value="htmlContent"
    :ishljs="false"
    :subfield="false"
    defaultOpen="preview"
    :toolbarsFlag="false"
    :editable="false"
    codeStyle="github-dark"
    style="z-index: 20; background-color: white"
  >
  </mavon-editor>
</template>

<script>
import { marked } from "marked";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      htmlContent: "",
      code: `## 课程介绍
![image20211219121555979.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/e7131718e9e64faeaf3fe16404186eb4.png)

## 0. 简介1

​	**Spring Security** 是 Spring 家族中的一个安全管理框架。相比与另外一个安全框架**Shiro**，它提供了更丰富的功能，社区资源也比Shiro丰富。

​	一般来说中大型的项目都是使用**SpringSecurity** 来做安全框架。小项目有Shiro的比较多，因为相比与SpringSecurity，Shiro的上手更加的简单。

​	 一般Web应用的需要进行**认证**和**授权**。

​		**认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户**

​		**授权：经过认证后判断当前用户是否有权限进行某个操作**

​	而认证和授权也是SpringSecurity作为安全框架的核心功能。



## 1. 快速入门

### 1.1 准备工作

​	我们先要搭建一个简单的SpringBoot工程

① 设置父工程 添加依赖

~~~~
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.0</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>
~~~~

② 创建启动类

~~~~
@SpringBootApplication
public class SecurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecurityApplication.class,args);
    }
}

~~~~

③ 创建Controller

~~~~java

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello(){
        return "hello";
    }
}

~~~~



### 1.2 引入SpringSecurity

​	在SpringBoot项目中使用SpringSecurity我们只需要引入依赖即可实现入门案例。

~~~~xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
~~~~

​	引入依赖后我们在尝试去访问之前的接口就会自动跳转到一个SpringSecurity的默认登陆页面，默认用户名是user,密码会输出在控制台。

​	必须登陆之后才能对接口进行访问。



## 2. 认证

### 2.1 登陆校验流程
![image20211215094003288.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/414a87eeed344828b5b00ffa80178958.png)`,
    };
  },
  mounted() {
    this.htmlContent = marked(this.code);
  },
};
</script>
<style scoped></style>
<!-- 
    <mavon-editor
    :value="htmlContent"   // md
    :subfield="false"      // false： 单栏(编辑预览分屏)
    defaultOpen="preview"  // preview： 默认展示预览区域 
    :toolbarsFlag="false"  //工具栏是否显示
    :editable="false"      //是否允许编辑
    ishljs
  ></mavon-editor>
 -->
