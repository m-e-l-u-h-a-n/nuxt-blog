<template>
    <section class="featured-posts">
	  <post-preview id="1" title="Hello there" previewText="This is my first post!"/>
	  <post-preview id="2" title="bello there" previewText="This is my second post!"/>
	  <post-preview id="3" title="tello there" previewText="This is my third post!"/>
	</section>
</template>
<script>
import PostPreview from '@/components/posts/PostPreview';
export default {
	components: {
		PostPreview
	}
}
</script>
<style scoped>
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>