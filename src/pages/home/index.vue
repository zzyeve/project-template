<template>
    <div class="page">
        <ViewImg :imgUrl="url"></ViewImg>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: "https://kaifa.qiaoxingtx.com/data/images/newContract/0/20200513163318.jpg"
        }
    }
}
</script>
<style>
    .page {
        background: #ddd;
    }
</style>