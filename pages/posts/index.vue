<template>
  <div class="posts-page">
    <post-list :posts="loadedPosts" />
  </div>
</template>
<script>
import PostList from "@/components/posts/PostList";
export default {
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(
        resolve({
          loadedPosts: [
            {
              id: "1",
              title: "First Post",
              previewText: "Preview of first post!"
            },
            {
              id: "2",
              title: "Second Post",
              previewText: "Preview of second post!"
            },
            {
              id: "3",
              title: "Third Post",
              previewText: "Preview of third post!"
            },
            {
              id: "4",
              title: "Fourth Post",
              previewText: "Preview of fourth post!"
            },
            {
              id: "5",
              title: "Fifth Post",
              previewText: "Preview of fifth post!"
            }
          ]
        }),
        1500
      );
    })
      .then(data => {
		  return data;
	  })
      .catch(e => {
        context.error(new Error());
      });
  },
  components: {
    PostList
  },
  created() {
	  this.$store.dispatch('setPosts',this.loadedPosts)
  }
};
</script>
<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>