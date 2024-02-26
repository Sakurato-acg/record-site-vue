<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLayoutStore, useUserStore } from '../../stores/index'
import { useRouter } from 'vue-router'
import { userLogoutService, userInfoService } from '../../api/auth/user'

const userStore = useUserStore()

//退出登录
const logout = () => {
  userLogoutService()
    .then((data) => {
      userStore.removeToken()
      userStore.removeAsideMenu()

      route.push('/login')
    })
    .catch((err) => {})
}

//menu
const layoutStore = useLayoutStore()

const hiddenMenu = () => {
  layoutStore.changeMenuHidden()
}

const hidden = computed(() => {
  return layoutStore.menu.hidden
})

//title
const route = useRouter()
const title = computed(() => {
  let title = route.currentRoute.value.meta.title
  return title.split('/')
})

//userInfo
const userInfo = ref({
  id: undefined,
  avatar: undefined,
  userName: undefined,
  nickName: undefined
})

//date
const nowDate = ref('')

const formDate = () => {
  let date = new Date()
  let year = date.getFullYear() // 年
  let month = date.getMonth() + 1 // 月
  let day = date.getDate() // 日
  let hour = date.getHours() // 时
  hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
  let minute = date.getMinutes() // 分
  minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
  let second = date.getSeconds() // 秒
  second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
  nowDate.value = `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
const currentTime = () => {
  setInterval(formDate, 1000)
}
onMounted(() => {
  currentTime()
  // if (userStore.checkUserInfo()) {
  //   userInfo.value = userStore.userInfo
  // } else {
  userInfoService()
    .then((data) => {
      userInfo.value = data
      // userStore.setUserInfo(data)
    })
    .catch((error) => {})
  // }
})
onBeforeUnmount(() => {
  if (formDate) {
    clearInterval(formDate)
  }
})
</script>

<template>
  <el-header>
    <!--隐藏按钮-->
    <div>
      <div class="drawer" @click="hiddenMenu()">
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
          :class="{ 'duration-300': true, 'rotate-180': hidden }"
          style="font-size: 1.1em"
        >
          <path
            fill="currentColor"
            d="M11 13h10v-2H11m0-2h10V7H11M3 3v2h18V3M3 21h18v-2H3m0-7l4 4V8m4 9h10v-2H11v2Z"
          ></path>
        </svg>
      </div>
    </div>
    <!--面包屑-->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :to="{ path: '/admin' }"
          v-if="$router.currentRoute.fullPath != '/admin/disccard'"
        >
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else>首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in title" :key="index">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--右边栏-->
    <div>
      <el-button @click="route.push('/')"> 返回前台 </el-button>
      <el-avatar shape="square" :size="40" :src="userInfo.avatar" />
      <div class="user">
        <span class="name">你好, &nbsp;&nbsp;{{ userInfo.nickName }}</span>
        <span class="time">{{ nowDate }}</span>
      </div>
      <el-dropdown>
        <el-icon>
          <Setting></Setting>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Github仓库</el-dropdown-item>
            <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="less" scoped>
.el-header {
  border-color: #e5e7eb;
  border-style: solid;
  border-bottom-width: 1px;

  display: flex;
  justify-content: space-between;

  height: 60px;
  padding: 0 20px;

  div:nth-of-type(1) {
    display: flex;
    align-items: center;
    .drawer {
      padding-right: 0.75rem;
      cursor: pointer;
      svg {
        transition-duration: 300ms;
      }
    }
  }
  div:nth-of-type(2) {
    // background-color: red;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 766px) {
    > div:nth-of-type(2) {
      display: none;
    }
  }
  div:nth-of-type(3) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: flex-end;
    height: 100%;
    flex: 1 1 0%;

    .el-avatar {
      img {
        object-fit: cover;
      }
    }

    .user {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        --tw-text-opacity: 1;
        color: rgb(75 85 99 / var(--tw-text-opacity));
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      @media screen and (max-width: 768px) {
        .time {
          // display: none;
        }
      }
    }
    .el-dropdown {
      i {
        font-size: 20px;

        transition-duration: 500ms;
        cursor: pointer;
        margin-top: 1px;
        margin-left: 0.5rem;
      }
      i:hover {
        transform: translate(0, 0) rotate(90deg) skewX(0) skewY(0) scaleX(1) scaleY(1);
      }
    }
  }
}
.rotate-180 {
  transform: translate(0, 0) rotate(180deg) skewX(0) skewY(0) scaleX(1) scaleY(1);
}
</style>
