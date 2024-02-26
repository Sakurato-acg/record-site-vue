<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userInfoService, userLogoutService } from '../../api/auth/user'
import { useUserStore } from '../../stores/index'

const userStore = useUserStore()

const router = useRouter()

const drawer = ref(false)

const userInfo = ref()

onMounted(() => {
  if (userStore.token != undefined && userStore.token != '') {
    userInfoService()
      .then((data) => {
        userInfo.value = data
        // userStore.setUserInfo(data)
      })
      .catch((error) => {})
  }
})

/**
 *
 * @param {*} index 当前path
 * @param {list} indexPath 父级和子级的path
 */
const selectMenu = (index, indexPath, item, routeResult) => {
  router.push(index)
  drawer.value = !drawer.value
  // console.log(index, indexPath, item, routeResult)
}
const goback = () =>
  setTimeout(() => {
    router.go(0)
  }, 1000)
//退出登录
const logout = () => {
  userLogoutService()
    .then((data) => {
      userStore.removeToken()
      userStore.removeAsideMenu()
      goback()
      clearTimeout(goback)
    })
    .catch((err) => {})
}
</script>
<template>
  <el-header class="blogHeader">
    <div class="aside">
      <el-drawer
        v-model="drawer"
        title="I am the title"
        :with-header="false"
        direction="ltr"
        size="50%"
        class="test"
      >
        <summary-aside></summary-aside>
        <hr />
        <el-menu
          text-color="#4f1e08"
          active-text-color="#3eaf7c"
          :router="false"
          @select="selectMenu"
        >
          <!--首页-->
          <el-menu-item index="/" class="nav-item">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <!--发现-->
          <el-sub-menu index="#" class="nav-item">
            <template #title>
              <el-icon><Menu /></el-icon>
              <span>发现</span>
            </template>
            <el-menu-item index="/blog/collation">归类</el-menu-item>
          </el-sub-menu>
          <!--娱乐-->
          <el-sub-menu index="/acg" class="nav-item">
            <template #title>
              <el-icon><Service /></el-icon>
              <span>acg</span>
            </template>
            <el-menu-item index="/4-1">音乐</el-menu-item>
            <el-menu-item index="/acg/anime">番剧</el-menu-item>
          </el-sub-menu>
          <!--链接-->
          <el-sub-menu index="5" class="nav-item">
            <template #title>
              <el-icon><Link /></el-icon>
              <span>链接</span>
            </template>
            <el-menu-item index="5-1">友链</el-menu-item>
            <el-menu-item index="5-2">收藏夹</el-menu-item>
          </el-sub-menu>
          <!--关于-->
          <el-menu-item index="6" class="nav-item">
            <el-icon><Promotion /></el-icon>
            <span>关于</span>
          </el-menu-item>
          <!--管理端-->
          <el-menu-item index="/admin" class="nav-item">
            <el-icon><Setting /></el-icon>
            <span>管理端</span>
          </el-menu-item>
        </el-menu>
      </el-drawer>
    </div>
    <div class="title">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
        @click="drawer = true"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
        />
      </svg>
      <span @click="router.push('/')">Record-Site</span>
    </div>
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      text-color="#4f1e08"
      active-text-color="#3eaf7c"
      router
      :default-active="router.currentRoute.value.path"
      style="align-items: center"
    >
      <!--搜索-->
      <el-menu-item index="1" class="nav-item">
        <el-icon><Search /></el-icon>
        <span>搜索</span>
      </el-menu-item>
      <!--首页-->
      <el-menu-item index="/" class="nav-item">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <!--发现-->
      <el-sub-menu index="#" class="nav-item">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>发现</span>
        </template>
        <el-menu-item index="/blog/collation">归类</el-menu-item>
      </el-sub-menu>
      <!--娱乐-->
      <el-sub-menu index="4" class="nav-item">
        <template #title>
          <el-icon><Service /></el-icon>
          <span>娱乐</span>
        </template>
        <el-menu-item index="4-1">音乐</el-menu-item>
        <el-menu-item index="/acg/anime">番剧</el-menu-item>
      </el-sub-menu>
      <!--链接-->
      <el-sub-menu index="5" class="nav-item">
        <template #title>
          <el-icon><Link /></el-icon>
          <span>链接</span>
        </template>
        <el-menu-item index="5-1">友链</el-menu-item>
        <el-menu-item index="5-2">收藏夹</el-menu-item>
      </el-sub-menu>
      <!--关于-->
      <el-menu-item index="6" class="nav-item">
        <el-icon><Promotion /></el-icon>
        <span>关于</span>
      </el-menu-item>
      <!--管理端-->
      <el-menu-item index="/admin" class="nav-item">
        <el-icon><Setting /></el-icon>
        <span>管理端</span>
      </el-menu-item>
      <!--用户-->
      <!--已登录 -->
      <el-menu-item class="nav-item" v-if="userInfo != undefined">
        <el-dropdown>
          <span class="flex-common">
            <el-avatar :src="userInfo.avatar" />
            <span>{{ userInfo.nickName }}</span>
          </span>
          <template #dropdown v-if="userInfo != undefined">
            <el-dropdown-menu>
              <el-dropdown-item @click="logout()">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu-item>
      <!--未登录-->
      <el-menu-item v-else class="nav-item">
        <span class="flex-common" @click="router.push('/login')">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span>登录</span>
        </span>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<style lang="less">
.blogHeader {
  width: 100%;
  height: 57.6px;
  display: flex;

  justify-content: space-between;
  align-items: center;
  // box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.4s ease;

  position: fixed;
  z-index: 999;

  .title {
    flex-grow: 1;
    display: flex;
    align-items: center;
    svg {
      display: none;
      margin-right: 20px;
      fill: #242424;
    }
    span {
      font-size: 19.2px;
      font-weight: 600;
      // color: #242424;
      color: #242424;
      cursor: pointer;
    }
  }
  //单框
  .el-menu-item {
    padding: 0;
    margin-left: 20px;
    // font-weight: 600;
    transition: none;
  }
  //多框
  .el-sub-menu__title {
    padding: 0;
    margin-left: 20px;
    // font-weight: 600;
    transition: none;
  }

  @media screen and (max-width: 768px) {
    .title svg {
      display: block;
    }
    .nav-item:nth-of-type(2),
    .nav-item:nth-of-type(3),
    .nav-item:nth-of-type(4),
    .nav-item:nth-of-type(5),
    .nav-item:nth-of-type(6),
    .nav-item:nth-of-type(7) {
      display: none;
    }
    .aside .nav-item {
      display: block;
    }
  }
}
hr {
  border: 0;
  border-top: 1px #eaecef solid;
}

//其他
//去掉多框的^

.el-sub-menu .el-sub-menu__icon-arrow {
  display: none;
}
@media screen and (max-width: 768px) {
  .el-sub-menu .el-sub-menu__icon-arrow {
    display: block;
  }
}
//右边列表背景透明
.el-menu--horizontal.el-menu {
  background: transparent;
}
//经过时不显示背景色
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: inherit;
}
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
  background-color: transparent;
}
//去除下划线
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
  border-bottom: none !important;
}

//下拉栏
.el-menu--popup {
  min-width: 70px;
  .el-menu-item {
    padding: 0 20px !important;
    color: #4f1e08 !important;
    font-weight: 600;
  }
}
.el-menu {
  border-right: none;
}
// .el-drawer__body {
//   overflow: hidden;
// }
</style>
