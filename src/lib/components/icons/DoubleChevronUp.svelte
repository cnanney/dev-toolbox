<script>
  export let fill = 'none'
  export let stroke = 'currentColor'
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  {fill}
  {stroke}
  {...$$restProps}
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M5 11l7-7 7 7M5 19l7-7 7 7"
  />
</svg>
