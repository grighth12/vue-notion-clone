<template>
  <!-- 입력을 하면서 빠르게 다른 페이지로 넘어가는 경우 주소는 바뀌더라도 렌더링은 다시 되지 않을 수 있음, page가 다를 때 key를 통해 최적화 해야함  -->
  <section :key="$route.params.id">
    <div class="inner">
      <div
        ref="title"
        class="title"
        placeholder="제목 없음"
        contenteditable
        @input="onInput">
        {{ title }}
      </div>
      <div
        ref="content"
        class="content"
        placeholder="내용을 입력하세요!"
        contenteditable
        @input="onInput"
        v-html="content">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // ? store에 있는 상태 이용하면 반응성을 갖는게 아닌가?
  // ? 아 store에 있는 상태는 반응성을 갖지만 현재 구조에서 $route.params.id가 바뀔 때 데이터 갱신을 안해주니까 반응성을 못 갖는구나..
  // ? 이거를 클릭할 때 해주는게 더 응집도 있지 않나...
  // ? workspace에 관련한 이벤트가 여기에서만 일어나는건 아니지만.. 음... 여기에 해당하는 일로 보는게 더 맞나?
  computed: {
    title() {
      return this.$store.state.workspace.currentWorkspace.title;
    },
    content() {
      return this.$store.state.workspace.currentWorkspace.content;
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('workspace/readWorkspace', {
        id: this.$route.params.id,
      });
    }
  },
  created() {
    this.$store.dispatch('workspace/readWorkspace', {
      id: this.$route.params.id,
    });
  },
  methods: {
    onInput() {
      if(!this.$refs.content.textContent.trim()) {
        this.$refs.content.innerHTML = '';
      }

      // FIXME 업데이트가 동시에 되면서 커서가 자꾸 앞으로 가는 문제 발생, 원인은 여기
      this.$store.dispatch('workspace/updateWorkspace', {
        id: this.$route.params.id,
        title: this.$refs.title.textContent,
        content: this.$refs.content.innerHTML,
      });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding: 100px 0 200px;
  .inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
    [contenteditable] {
      outline: none;
      cursor: text;
      &.title {
        font-size: 44px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      &.content {
        font-size: 16px;
      }
      &:empty::before {
        content: attr(placeholder);
        color: rgba($color-font, .3);
      }
    }
  }
}
  
</style>