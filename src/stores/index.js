import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore(
  'layout',
  () => {
    const menu = ref({
      hidden: false
    })

    const changeMenuHidden = () => {
      menu.value.hidden = !menu.value.hidden
    }

    const summary = ref({
      article: undefined,
      category: undefined,
      tag: undefined,
      pv: undefined
    })

    const setSummaryArticle = (data) => {
      summary.value.article = data
    }
    const setSummaryCategory = (data) => {
      summary.value.category = data
    }
    const setSummaryTag = (data) => {
      summary.value.tag = data
    }
    const setSummaryPV = (data) => {
      summary.value.pv = data
    }

    const removeSummary = () => {
      summary.value = {
        article: undefined,
        category: undefined,
        tag: undefined,
        pv: undefined
      }
    }

    return {
      menu,
      changeMenuHidden,
      summary,
      removeSummary,
      setSummaryArticle,
      setSummaryCategory,
      setSummaryTag,
      setSummaryPV
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'menu-hidden',
          storage: localStorage,
          paths: ['menu']
        }
      ]
    }
  }
)

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    //边栏的路由
    const asideMenu = ref('')
    const setAsideMenu = (menu) => {
      asideMenu.value = menu
    }
    const removeAsideMenu = () => {
      asideMenu.value = ''
    }

    return {
      token,
      setToken,
      removeToken,
      asideMenu,
      setAsideMenu,
      removeAsideMenu
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          // 自定义存储的 key，默认是 store.$id
          key: 'user-token',
          // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
          storage: localStorage,
          // state 中的字段名，按组打包储存
          paths: ['token']
        }
      ]
    }
  }
)
export const useCommentStore = defineStore('comment', () => {
  const comment = ref({
    list: [],
    articleId: undefined
  })
  const setCommentList = (data) => {
    comment.value.list = data
  }
  const setCommentAId = (data) => {
    comment.value.articleId = data
  }
  return {
    comment,
    setCommentAId,
    setCommentList
  }
})
