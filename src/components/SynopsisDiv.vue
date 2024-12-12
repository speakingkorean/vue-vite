<script setup lang="ts">

defineProps<{
    link?: string
    imgSrc?: string
    title?: string
    text?: string
}>()

</script>

<template>
    <div class="synopsis sqs dir-ltr">
        <div class="syn-img sqs">
            <a :href="link || '#'">
                <img :src="imgSrc" />
            </a>
        </div>

        <div class="syn-body sqs">
            <p class="contextTitle">
                {{ title }}
            </p>
            <h2>
                <a :href="link">
                    {{ text }}
                </a>
            </h2>
        </div>
    </div>
</template>