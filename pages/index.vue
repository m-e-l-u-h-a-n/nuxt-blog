<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <post-list :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList";
export default {
  components: {
    PostList
  },
  asyncData(context,callback) {
    console.log(context);
    setTimeout(() => {
      callback(null,{
        loadedPosts: [
          {id:"1",title: "First Post", previewText: "Preview of first post!"},
          {id:"2",title: "Second Post", previewText: "Preview of second post!"},
          {id:"3",title: "Third Post", previewText: "Preview of third post!"},
          {id:"4",title: "Fourth Post", previewText: "Preview of fourth post!"},
          {id:"5",title: "Fifth Post", previewText: "Preview of fifth post!"},
        ]
      })
    }, 1500);
  },
  // data() {
  //   return {
  //     loadedPosts: []
  //   };
  // },
  created() {}
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page-background.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>
