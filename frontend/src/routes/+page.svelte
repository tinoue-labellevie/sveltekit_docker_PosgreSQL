<script lang="ts">
    import type { PageData } from './$types'; // +page.server.js から渡されるデータの型
  
    // +page.server.js から items データを受け取る
    export let data: PageData;
  
    // データが存在しない場合のエラー表示などを考慮
    const items = data.items || [];
    const error = data.error;
  </script>
  
  <h1>アイテムリスト</h1>
  
  {#if error}
    <p style="color: red;">エラー: {error}</p>
  {:else if items.length > 0}
    <ul>
      {#each items as item (item.id)}
        <li>ID: {item.id} - {item.name}</li>
      {/each}
    </ul>
  {:else}
    <p>アイテムが見つかりませんでした。</p>
  {/if}
  
  <style>
    /* スタイルは任意に追加 */
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      background-color: #f4f4f4;
      margin-bottom: 5px;
      padding: 10px;
      border-radius: 4px;
    }
  </style>