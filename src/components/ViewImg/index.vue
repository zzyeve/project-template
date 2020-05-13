/* 查看图片 */
<template>
    <div class="viewImg" :class="{'imgList':isTableShow}">
        <template v-if="image">
            <img :src="image" />
            <div class="removeImg">
                <i class="el-icon-search icon" @click="viewImg"></i>
                <slot></slot>
            </div>
        </template>
        <template v-else>
            <p class="no-data">暂无图片</p>
        </template>

        <el-dialog
            title="查看图片"
            :visible.sync="visible"
            :width="width"
            append-to-body>
            <div style="text-align:center;">
                <img :src="image" v-if="visible" @load="onLoad" />
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        imgUrl: {
            type: String,
            default: ""
        },
        isTableShow: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        imgUrl: function(newVal, oldVal) {
            this.image = newVal
        }
    },
    data() {
        return {
            image: this.imgUrl,
            visible: false,
            width: ""
        }
    },
    methods: {
        viewImg() {
            this.visible = true
        },
        onLoad(e){
            const img = e.target;
            let width = 0;
            if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
                width = img.width + 40;
            }
            this.width = width + 'px';
        }
    }
}
</script>

<style scoped lang="scss">
.viewImg {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-bottom: 5px;
  min-height: 50px;
  line-height: 0;
  border: 1px dashed #dcdee2;
  background: #fff;
  vertical-align: top;
  & + & {
    margin-left: 6px;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    transform: translate(-50%, -50%);
    border: none;
    vertical-align: middle;
  }
  .removeImg {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    .icon {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      color: #fff;
      cursor: pointer;
    }
  }
  &:hover .removeImg {
    display: block;
  }
  .no-data {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 20px;
    line-height: 20px;
    text-align: transparent;
  }
}
.imgList {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
}
</style>
