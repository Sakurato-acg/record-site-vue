<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useLayoutStore, useUserStore } from '../../stores/index'
import { useRouter } from 'vue-router';

const layoutStore = useLayoutStore()
const userStore = useUserStore()
const router = useRouter();

// const menu = ref([
//   {
//     id: '2023',
//     label: '展示',
//     orderNum: 0,
//     path: '/discard',
//     icon: 'monitor',

//     parentId: '0',
//     perms: 'content:article:writer',
//     status: '0'
//   },
//   {
//     children: [
//       {
//         id: '100',
//         icon: 'setting',
//         label: '用户管理',
//         path: '/system/user',
//         orderNum: 1,
//         perms: 'system:user:list',
//         status: '0'
//       },
//       {
//         id: '101',
//         icon: 'setting',
//         label: '角色管理',
//         path: '/system/role',
//         orderNum: 2,
//         perms: 'system:role:list',
//         status: '0'
//       },
//       {
//         id: '102',
//         icon: 'setting',
//         label: '菜单管理',
//         path: '/system/menu',
//         orderNum: 3,
//         perms: 'system:menu:list',
//         status: '0'
//       }
//     ],
//     id: '1',
//     icon: 'location',
//     label: '系统管理',
//     path: '/system',
//     orderNum: 1,
//     perms: '',
//     status: '0'
//   },
//   {
//     children: [
//       {
//         id: '2019',
//         icon: 'setting',
//         label: '文章管理',
//         path: '/blog/article',
//         orderNum: 0,
//         perms: 'content:article:list',
//         status: '0'
//       },
//       {
//         id: '2019',
//         icon: 'edit',
//         label: '写博客',
//         path: '/blog/edit',
//         orderNum: 0,
//         perms: 'content:article:edit',
//         status: '0'
//       }
//     ],
//     id: '2017',
//     icon: 'setting',
//     label: '博客管理',
//     orderNum: 4,
//     path: '/blog',
//     perms: '',
//     status: '0'
//   }
// ])

const menu = ref([])
onBeforeMount(() => {
  menu.value = userStore.asideMenu
  router.replace(router.getRoutes.path)
})

const noChildren = computed(() => {
  return menu.value.filter((item) => !item.children)
})
const hasChildren = computed(() => {
  return menu.value.filter((item) => item.children)
})
const hidden = computed(() => {
  return layoutStore.menu.hidden
})
</script>
<template>
  <el-aside width="250px" :class="{ close: hidden }">
    <!-- <el-aside> -->
    <div class="aside-header">
      <div class="box cursor-pointer">
        <div>
          <img src="../../assets/img/logo.webp" alt="" />
        </div>

        <div :class="{ hiddenTitle: hidden }">
          <span>博客管理系统</span>
        </div>
      </div>
    </div>

    <el-menu
      :default-active="$route.path"
      :collapse="hidden"
      background-color="#fff"
      active-text-color="blue"
      router
    >
      <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.name">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>

      <el-sub-menu v-for="item in hasChildren" :key="item.path" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="child.path" v-for="child in item.children" :key="child.path">
            {{ child.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="less">
.el-aside {
  z-index: 50;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;

  border-right-width: 1px;
  border-style: solid;
  transition-duration: 500ms;
  background-color: #fff;

  border-color: #e5e7eb;

  .aside-header {
    display: flex;
    justify-content: center;

    // background-color: antiquewhite;

    .box {
      display: flex;
      align-items: center;

      width: 220px;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;

      div:first-of-type {
        width: 2.5rem;
        margin-left: 1rem;
      }
      div:last-of-type {
        margin-right: 0.25rem;
        margin-left: 0.5rem;
        width: 160px;
        span {
          color: #000;
          font-weight: 700;
          font-size: 1rem;
        }
      }
    }
  }
  .el-menu {
    width: 100%;
    height: 100%;

    border-right: 0;
  }
  // .el-menu--collapse {
  //   i {
  //     display: none;
  //   }
  // }

  .el-menu-item [class^='el-icon-'] {
    color: #000;
    font-weight: normal;
  }
  .el-submenu__title i {
    color: #000;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 250px;
  }
}
.close {
  width: 70px !important;
  transition-duration: 500ms;
}
.hiddenTitle {
  display: none;
}
.el-menu-item-group__title {
  display: none;
}
@media screen and (max-width: 766px) {
  .el-aside {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    min-height: 100vh;
    // width: 250px;
    border-right-width: 1px;
    border-style: solid;
    transition-duration: 500ms;
  }

  .close {
    left: -250px;
    transition-duration: 500ms;
  }
}
// .el-sub-menu .el-sub-menu__icon-arrow {
//   display: block !important;
// }
</style>
