<template>
  <div class="app__inner">
    <LNB />
    <div class="app__page">
      <Header />
      <div class="page__container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import LNB from '~/components/LNB';
import Header from '~/components/Header';

export default {
  components: {
    LNB,
    Header
  }  
};
</script>

<style lang="scss" scoped>
.app__inner {
  display: flex;
  height: 100vh;
  color: $color-font;
  font-size: 14px;
  line-height: 1.4;
  font-family: 'Noto Sans KR', sans-serif;
  .app__page {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .page__header {
      height: 80px;
    }

    .page__container {
      flex-grow: 1;
      overflow-y: auto; // 내부 컨텐츠의 높이가 넘어가면 스크롤
    }
  }
}
</style>
