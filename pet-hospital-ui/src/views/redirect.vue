<script setup>
import { useRouter } from "vue-router";

let router = useRouter();
const { params, query } = router;
const { path } = params;
router.replace({ path: "/" + path, query });
</script>
