<template>
  <div class="tags-nav-wrap">
    <div class="tags-nav">
      <div class="close-con">
        <el-dropdown @command="handleTagsOption">
          <el-button type="text" icon="el-icon-circle-close"></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="key" v-for="(val, key) in menuList" :key="val">{{$t(val)}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
			<div class="btn-con left-btn">
				<el-button type="text" @click="handleScroll(240)">
					<i class="el-icon-arrow-left icon"></i>
				</el-button>
      </div>
      <div class="btn-con right-btn">
				<el-button type="text" @click="handleScroll(-240)">
					<i class="el-icon-arrow-right icon"></i>
				</el-button>
      </div>
      <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
        <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
					<transition-group name="tag-animation" mode="in-out" tag="div">
            <el-tag
              v-for="(item) in list"
              hit
              ref="tagsPageOpened"
              :key="item.path"
              :name="item.name"
              :data-route-item="item"
              @close="handleClose(item)"
              @click.native="handleClick(item)"
              :closable="item.path !== indexPath"
              :effect="isCurrentTag(item) ? 'dark' : 'light'"
            >{{$t(item.name)}}</el-tag>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagBodyLeft: 0,
      outerPadding: 4,
      list: [],
      indexPath: "/news",
      menuList: {
        others: "common.otherClosed",
        all: "common.allClosed"
      }
    }
  },
  watch: {
    $route(to) {
      this.getTagElementByRoute(to)
    },
    list(newVal, oldVal) {
      sessionStorage.setItem("TagsNavHistory", JSON.stringify(newVal))
    }
  },
  mounted() {
    this.list = JSON.parse(sessionStorage.getItem("TagsNavHistory") || "[]")
    setTimeout(() => {
      this.getTagElementByRoute(this.$route)
    }, 200)
  },
  methods: {
    handlescroll(e) {
      var type = e.type
      let delta = 0
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },

    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },

    handleTagsOption(type) {
      if (type.includes("all")) {
        // 关闭所有，除了home
        this.list = this.list.filter(element => {
          return element.path === this.indexPath
        })
        this.$router.push(this.indexPath)
      } else if (type.includes("others")) {
        // 关闭除当前页和home页的其他页
        this.list = this.list.filter(item => this.$route.path === item.path || item.path === this.indexPath)
        this.$nextTick(() => {
          this.refsTag = this.$refs.tagsPageOpened
          this.refsTag.forEach((item, index) => {
            if (this.indexPath === item.$attrs["data-route-item"].path) {
              let tag = this.refsTag[index].$el
              this.moveToView(tag)
            }
          })
        })
        this.$router.push(this.$route.path)
      }
    },

    handleClick(item) {
      this.$router.push({ path: item.path, query: item.query })
    },

    handleClose(current, type) {
      this.list.forEach((element, index) => {
        if (element.path === current.path) {
          this.list.splice(index, 1)
          if (current.path === this.$route.path) {
						let currentIndex = index-1 > 0 ? index-1 : 0 // 避免报错
            this.$router.push(this.list[currentIndex].fullPath)
          }
        }
      })
    },

    isCurrentTag(item) {
      return item.path === this.$route.path ? true : ""
    },

    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },

    routeEqual(current) {
      return this.list.some(element => {
        return element.path == current.path
      })
    },

    getTagElementByRoute(route) {
      if (!this.routeEqual(this.$route)) {
        let { name, path, query, fullPath } = this.$route
        if (query && query.tag) {
          name += `-${query.tag}`
        }
        this.list.push({ name, path, query, fullPath})
      }
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (route.path === item.$attrs["data-route-item"].path) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-nav-wrap {
  width: 100%;
  height: 36px;
}
.tags-nav {
  position: relative;
  height: 100%;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  .close-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 30px;
    background: #fff;
    text-align: center;
    z-index: 10;
    border-left: 1px solid #f0f0f0;
    .el-dropdown {
      height: 100%;
      width: 100%;
      .el-button {
        width: 100%;
        font-size: 14px;
      }
    }
  }
	.btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
		.el-button {
			padding: 6px 4px;
			line-height: 14px;
			text-align: center;
			font-size: 14px;
		}
    &.left-btn {
      left: 0px;
    }
    &.right-btn {
      right: 30px;
      // border-right: 1px solid #f0f0f0;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 20px;
    right: 50px;
    top: 0;
    bottom: 0;
    overflow: hidden;
    .scroll-body {
      height: 100%;
      display: inline-block;
      padding: 0 4px;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      display: flex;
      align-items: center;
      .el-tag {
        cursor: pointer;
        transition: all 0.5s;
        & + .el-tag {
          margin-left: 10px;
        }
      }
    }
  }
}

.tag-animation-enter-active,
.tag-animation-leave-active {
  transition: all 0.5s;
}
.tag-animation-enter,
.tag-animation-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.tag-animation-leave-active {
  position: absolute;
}
</style>
