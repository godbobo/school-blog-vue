<!--评论模块-->
<template>
  <div class="container">
    <div v-for="(item, index) in comments" :key="index" class="comment">
      <div class="info">
        <img :src="item.creator.headimg" class="avatar" width="36" height="36">
        <div class="right">
          <div class="name">{{ item.creator.realName }}</div>
          <div class="date">{{ item.upt }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <!-- <span :class="{active: item.isLike}" class="like" @click="likeClick(item)">
          <i class="iconfont icon-like"/>
          <span class="like-num">{{ item.likeNum > 0 ? item.likeNum + '人赞' : '赞' }}</span>
        </span> -->
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"/>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div v-for="(reply, ind) in item.childs" :key="ind" class="item">
          <div class="reply-content">
            <span class="from-name">{{ reply.creator.realName }}</span><span>: </span>
            <span class="to-name">@{{ reply.targetUser.realName }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.upt }}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"/>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div v-if="item.childs && item.childs.length > 0" class="write-reply" @click="showCommentInput(item)">
          <i class="el-icon-edit"/>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div v-if="showItemId === item.id" class="input-wrapper">
            <el-input
              v-model="inputComment"
              :rows="3"
              class="gray-bg-input"
              type="textarea"
              autofocus
              placeholder="写下你的评论"/>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment(item)">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      inputComment: '',
      showItemId: '',
      reply: {}
    }
  },
  computed: {},
  created() {
    // console.log(this.comments)
  },
  methods: {
    /**
       * 点赞
       */
    // likeClick(item) {
    //   if (item.isLike === null) {
    //     Vue.$set(item, 'isLike', true)
    //     item.likeNum++
    //   } else {
    //     if (item.isLike) {
    //       item.likeNum--
    //     } else {
    //       item.likeNum++
    //     }
    //     item.isLike = !item.isLike
    //   }
    // },

    /**
       * 点击取消按钮
       */
    cancel() {
      this.showItemId = ''
    },

    /**
       * 提交评论
       */
    commitComment(item) {
      if (this.reply) {
        let content = this.inputComment
        // 去掉提示用户的@xxx
        const tip = `@${this.reply.creator.realName} `
        if (content.indexOf(tip) === 0) {
          content = content.substr(tip.length, content.length - tip.length)
        }
        this.$emit('commit-comment', content, this.reply.id, this.reply.creator.id)
      } else {
        // 如果目标不是子评论，则直接回复即可
        this.$emit('commit-comment', this.inputComment, item.id, item.creator.id)
      }
    },

    /**
       * 点击评论按钮显示输入框
       * item: 当前大评论
       * reply: 当前回复的评论
       */
    showCommentInput(item, reply) {
      if (reply) {
        this.inputComment = '@' + reply.creator.realName + ' '
        this.reply = reply
        console.log(this.reply)
      } else {
        this.inputComment = ''
        this.reply = undefined
      }
      this.showItemId = item.id
    }
  }
}
</script>

<style scoped lang="scss">

$color-main: #409EFF;
$color-success: #67C23A;
$color-warning: #E6A23C;
$color-danger: #F56C6C;
$color-info: #909399;

$text-main: #303133;
$text-normal: #606266;
$text-minor: #909399;  //次要文字
$text-placeholder: #C0C4CC;
$text-333: #333;

$border-first: #DCDFE6;
$border-second: #E4E7ED;
$border-third: #EBEEF5;
$border-fourth: #F2F6FC;

$content-bg-color: #fff;

  .container {
    padding: 0 10px;
    box-sizing: border-box;
    .comment {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-bottom: 1px solid $border-fourth;
      .info {
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
        }
        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .name {
            font-size: 16px;
            color: $text-main;
            margin-bottom: 5px;
            font-weight: 500;
          }
          .date {
            font-size: 12px;
            color: $text-minor;
          }
        }
      }
      .content {
        font-size: 16px;
        color: $text-main;
        line-height: 20px;
        padding: 10px 0;
      }
      .control {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        .like {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          &.active, &:hover {
            color: $color-main;
          }
          .iconfont {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .comment-reply {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            color: $text-333;
          }
          .iconfont {
            font-size: 16px;
            margin-right: 5px;
          }
        }

      }
      .reply {
        margin: 10px 0;
        border-left: 2px solid $border-first;
        .item {
          margin: 0 10px;
          padding: 10px 0;
          border-bottom: 1px dashed $border-third;
          .reply-content {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: $text-main;
            .from-name {
              color: $color-main;
            }
            .to-name {
              color: $color-main;
              margin-left: 5px;
              margin-right: 5px;
            }
          }
          .reply-bottom {
            display: flex;
            align-items: center;
            margin-top: 6px;
            font-size: 12px;
            color: $text-minor;
            .reply-text {
              display: flex;
              align-items: center;
              margin-left: 10px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
              .icon-comment {
                margin-right: 5px;
              }
            }
          }
        }
        .write-reply {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-minor;
          padding: 10px;
          cursor: pointer;
          &:hover {
            color: $text-main;
          }
          .el-icon-edit {
            margin-right: 5px;
          }
        }
        .fade-enter-active, fade-leave-active {
          transition: opacity 0.5s;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }
        .input-wrapper {
          padding: 10px;
          .gray-bg-input, .el-input__inner {
            /*background-color: #67C23A;*/
          }
          .btn-control {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-top: 10px;
            .cancel {
              font-size: 16px;
              color: $text-normal;
              margin-right: 20px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
            }
            .confirm {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
