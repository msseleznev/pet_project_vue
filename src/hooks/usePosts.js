import axios from 'axios';
import { onMounted, ref } from 'vue';

export function usePosts(limitForPage) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios
        .get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: 1,
            _limit: limitForPage
          }
        });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limitForPage);
      posts.value = response.data;
    } catch (e) {
      console.log(e);
    } finally {
      isPostLoading.value = false;
    }
  };
  onMounted(fetching);
  return {
    posts, isPostLoading, totalPages
  };
}
