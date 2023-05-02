<template>
    <ul>
        <li>
            Номер блока: {{ block.number }}
        </li>
        <li>
            Хэш блока: {{ block.hash }}
            <button @click="$router.push(`/block/${block.number}`)">Подробнее</button>
        </li>
    </ul>
    
</template>

<script>
export default {
    name: "block",
    props: {
        block: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    ul {
        border: 1px solid black;
        margin: 10px;
        padding-bottom: 10px;
        background-color: #cbcbcb;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
    }
    button {
        border-radius: 5px;
        background-color: #adf0b0;
    }

</style>
