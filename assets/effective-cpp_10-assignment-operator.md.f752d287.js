import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.e9126b17.js";const F=JSON.parse('{"title":"赋值运算符应返回自己的引用","description":"","frontmatter":{},"headers":[],"relativePath":"effective-cpp/10-assignment-operator.md","filePath":"effective-cpp/10-assignment-operator.md","lastUpdated":1713579991000}'),l={name:"effective-cpp/10-assignment-operator.md"},o=p(`<h1 id="赋值运算符应返回自己的引用" tabindex="-1">赋值运算符应返回自己的引用 <a class="header-anchor" href="#赋值运算符应返回自己的引用" aria-label="Permalink to &quot;赋值运算符应返回自己的引用&quot;">​</a></h1><p>赋值运算符的编程惯例，可以支持链式的赋值语句：</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> a, b, c;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;"> // 链式赋值语句</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> a, b, c;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span><span style="color:#6A737D;"> // 链式赋值语句</span></span></code></pre></div><p>链式赋值已经成为了惯例，所以我们自定义的对象最好也能支持链式的赋值，为此我们需要重载赋值运算符，让其返回一个指向操作符左侧的引用：</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Widget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">public:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Widget</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">operator</span><span style="color:#B392F0;">=</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Widget</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">rhs</span><span style="color:#E1E4E8;">){</span><span style="color:#6A737D;">   // return type is a reference to</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;">                         // return the left-hand object</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Widget</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">operator</span><span style="color:#B392F0;">+=</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Widget</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">rhs</span><span style="color:#E1E4E8;">){</span><span style="color:#6A737D;">  // the convention applies to</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;">                        // +=, -=, *=, etc.</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Widget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">public:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Widget</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">operator</span><span style="color:#6F42C1;">=</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Widget</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#E36209;">rhs</span><span style="color:#24292E;">){</span><span style="color:#6A737D;">   // return type is a reference to</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span><span style="color:#6A737D;">                         // return the left-hand object</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Widget</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">operator</span><span style="color:#6F42C1;">+=</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Widget</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#E36209;">rhs</span><span style="color:#24292E;">){</span><span style="color:#6A737D;">  // the convention applies to</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span><span style="color:#6A737D;">                        // +=, -=, *=, etc.</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><ul><li>让赋值操作符返回一个指向自身的引用。</li></ul>`,7),e=[o];function t(c,r,y,E,i,d){return a(),n("div",null,e)}const A=s(l,[["render",t]]);export{F as __pageData,A as default};