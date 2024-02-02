import{_ as s,o as i,c as a,R as t}from"./chunks/framework.tOkQcohr.js";const c=JSON.parse('{"title":"Batch Control","description":"","frontmatter":{},"headers":[],"relativePath":"ui5/batchcontrol.md","filePath":"ui5/batchcontrol.md"}'),n={name:"ui5/batchcontrol.md"},h=t(`<h1 id="batch-control" tabindex="-1">Batch Control <a class="header-anchor" href="#batch-control" aria-label="Permalink to &quot;Batch Control&quot;">​</a></h1><h2 id="what-is-batch-control" tabindex="-1">What is batch control? <a class="header-anchor" href="#what-is-batch-control" aria-label="Permalink to &quot;What is batch control?&quot;">​</a></h2><p>Batch control puts multiple operations into one single HTTP request.</p><p>This allows the developer to control when data is sent to the server. This is usually done when a (save) button is pressed.</p><p>To batch multiple requests together you have to give the context, an UpdateGroupId</p><h2 id="binding-with-batch-control" tabindex="-1">Binding with batch control <a class="header-anchor" href="#binding-with-batch-control" aria-label="Permalink to &quot;Binding with batch control&quot;">​</a></h2><p>In this example we bind a context to a dialog and set the UpdateGroupId.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark has-focused-lines vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.pDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">oDialog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  oDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bindElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line has-focus"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: context.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span></span>
<span class="line has-focus"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    parameters: { $$updateGroupId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  oDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>To send the requests, you have to use the <a href="https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.ODataModel%23methods/submitBatch" target="_blank" rel="noreferrer"><strong>submitBatch()</strong></a> function with the UpdateGroupId as a parameter.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark has-focused-lines vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">saveDialog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line has-focus"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getOwnerComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">submitBatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_closeDialog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>To cancel the requests, you have to use the <a href="https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.ODataModel%23methods/resetChanges" target="_blank" rel="noreferrer"><strong>resetChanges()</strong></a> function with the UpdateGroupId as a parameter.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark has-focused-lines vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">saveDialog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line has-focus"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getOwnerComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resetChanges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_closeDialog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="creating-editing-with-batch-control-with-a-dialog" tabindex="-1">Creating &amp; Editing with batch control with a dialog <a class="header-anchor" href="#creating-editing-with-batch-control-with-a-dialog" aria-label="Permalink to &quot;Creating &amp; Editing with batch control with a dialog&quot;">​</a></h2><h3 id="example-1" tabindex="-1">Example 1: <a class="header-anchor" href="#example-1" aria-label="Permalink to &quot;Example 1:&quot;">​</a></h3><p>To create a new object, use the <a href="https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.ODataListBinding%23methods/create" target="_blank" rel="noreferrer"><strong>create()</strong></a> function after creating a List Binding (Aggregation Binding) with an UpdateGroupId.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> oNewObject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getOwnerComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bindList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/Object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    $$updateGroupId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">oDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setBindingContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(oNewObject);</span></span></code></pre></div><p>The create() function returns a context which can be directly bound to the dialog.</p><p>To edit, the object is bound to the dialog and given an updateGroupId.</p><p>This can be achieved with any function that allows binding a single object, such as <a href="https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.Element%23methods/bindElement" target="_blank" rel="noreferrer"><strong>bindElement()</strong></a>.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">oDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bindElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sPath, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  $$updateGroupId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>To avoid having both a create and edit occur after each other, you should separate them with an if statement.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sPath) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> oNewObject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getOwnerComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bindList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/Object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            $$updateGroupId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    oDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setBindingContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(oNewObject);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    oBookDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setBindingContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(oNewBook);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    oDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bindElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sPath, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $$updateGroupId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="example-2" tabindex="-1">Example 2: <a class="header-anchor" href="#example-2" aria-label="Permalink to &quot;Example 2:&quot;">​</a></h3><p>Alternatively, the UpdateGroupId can be set on the Binding of the list or table...</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">byId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bindItems</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/Object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  template: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">byId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;template&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  parameters: { $$updateGroupId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>Now that the list has an UpdateGroupId, you can create a new object on it directly. Therefore, you do not need to create a new binding with an UpdateGroupId, but instead, you can retrieve the binding and create a new object on it.</p><p>As the oEvent context includes the UpdateGroupId, there is no need to create a new binding.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">oContext </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">??=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">byId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getBinding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;items&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">oDialog.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setBindingContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(oContext);</span></span></code></pre></div><p>Here, a new context is created if it has not been set already, and then it is bound to the dialog.</p><p><strong>By using the exact same binding on the table and the dialog, any changes made in the dialog will also be applied to the table. However, these changes are only committed once you submit the batch.</strong></p>`,30),e=[h];function p(l,k,E,d,r,o){return i(),a("div",null,e)}const y=s(n,[["render",p]]);export{c as __pageData,y as default};
