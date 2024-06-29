import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.eecc699f.js";const C=JSON.parse('{"title":"绘制两个三角形","description":"","frontmatter":{},"headers":[],"relativePath":"computer-graphics/triangle.md","filePath":"computer-graphics/triangle.md"}'),p={name:"computer-graphics/triangle.md"},o=l(`<h1 id="绘制两个三角形" tabindex="-1">绘制两个三角形 <a class="header-anchor" href="#绘制两个三角形" aria-label="Permalink to &quot;绘制两个三角形&quot;">​</a></h1><p>在本次的实现中我们将使用 OpenGL 来进行绘制。OpenGL 自身是一个巨大的状态机，一系列的变量描述 OpenGL 此刻应当如何运行。</p><p>OpenGL 的状态通常被称为 OpenGL 上下文。我们通常可以通过设置选项，操作缓冲来更改 OpenGL 状态。最后，我们使用当前 OpenGL 上下文来渲染。</p><h2 id="创建窗口" tabindex="-1">创建窗口 <a class="header-anchor" href="#创建窗口" aria-label="Permalink to &quot;创建窗口&quot;">​</a></h2><p>在我们画出出色的效果之前，首先要做的就是创建一个 OpenGL 上下文和一个用于显示的窗口。</p><p>GLFW 是一个专门针对 OpenGL 的 C 语言库，它提供了一些渲染物体所需的最低限度的接口。它允许用户创建 OpenGL 上下文、定义窗口参数以及处理用户输入。</p><p>因为 OpenGL 只是一个标准/规范，具体的实现是由驱动开发商针对特定显卡实现的。由于 OpenGL 驱动版本众多，它大多数函数的位置都无法在编译时确定下来，需要在运行时查询。所以任务就落在了开发者身上，开发者需要在运行时获取函数地址并将其保存在一个函数指针中供以后使用。取得地址的方法因平台而异，GLAD 是一个开源的库，它帮我们解决了这类繁琐的问题。</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">#include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&lt;iostream&gt;</span></span>
<span class="line"><span style="color:#F97583;">#include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&lt;glad/glad.h&gt;</span></span>
<span class="line"><span style="color:#F97583;">#include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&lt;GLFW/glfw3.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">framebuffer_size_callback</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">GLFWwindow</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#FFAB70;">window</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">width</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">height</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glViewport</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, width, height);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">processInput</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">GLFWwindow</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#FFAB70;">window</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">glfwGetKey</span><span style="color:#E1E4E8;">(window, GLFW_KEY_ESCAPE) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> GLFW_PRESS)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glfwSetWindowShouldClose</span><span style="color:#E1E4E8;">(window, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">glfwInit</span><span style="color:#E1E4E8;">())</span><span style="color:#6A737D;"> // 初始化 GLFW</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::cerr </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Could not initialize GLFW!&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::endl;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 配置 GLFW</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glfwWindowHint</span><span style="color:#E1E4E8;">(GLFW_CONTEXT_VERSION_MAJOR, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glfwWindowHint</span><span style="color:#E1E4E8;">(GLFW_CONTEXT_VERSION_MINOR, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glfwWindowHint</span><span style="color:#E1E4E8;">(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glfwWindowHint</span><span style="color:#E1E4E8;">(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);</span><span style="color:#6A737D;"> // for macOS</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 创建窗口</span></span>
<span class="line"><span style="color:#E1E4E8;">    GLFWwindow </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">window </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">glfwCreateWindow</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">800</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">600</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;CG Tutorial&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (window </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::cout </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Failed to create GLFW window&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::endl;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glfwTerminate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 通知 GLFW 将我们窗口的上下文设置为当前线程的主上下文</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glfwMakeContextCurrent</span><span style="color:#E1E4E8;">(window);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 初始化 GLAD</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">gladLoadGLLoader</span><span style="color:#E1E4E8;">((GLADloadproc)glfwGetProcAddress))</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::cout </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Failed to initialize GLAD&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::endl;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 告诉 OpenGL 渲染窗口的尺寸大小，即视口</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glViewport</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">800</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">600</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">    // 告诉 GLFW 我们希望每当窗口调整大小的时候调用这个函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glfwSetFramebufferSizeCallback</span><span style="color:#E1E4E8;">(window, framebuffer_size_callback);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 渲染循环</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">glfwWindowShouldClose</span><span style="color:#E1E4E8;">(window))</span><span style="color:#6A737D;"> // 检查一次 GLFW 是否被要求退出</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#6A737D;">        // 输入</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">processInput</span><span style="color:#E1E4E8;">(window);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">        // 渲染指令</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glClearColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0.2</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.3</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.3</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1.0</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glClear</span><span style="color:#E1E4E8;">(GL_COLOR_BUFFER_BIT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">        // 检查并调用事件，交换缓冲</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glfwSwapBuffers</span><span style="color:#E1E4E8;">(window);</span><span style="color:#6A737D;"> // 交换颜色缓冲</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glfwPollEvents</span><span style="color:#E1E4E8;">();</span><span style="color:#6A737D;">        // 函数检查有没有触发什么事件、更新窗口状态，并调用对应的回调函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glfwTerminate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">#include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&lt;iostream&gt;</span></span>
<span class="line"><span style="color:#D73A49;">#include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&lt;glad/glad.h&gt;</span></span>
<span class="line"><span style="color:#D73A49;">#include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&lt;GLFW/glfw3.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">framebuffer_size_callback</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">GLFWwindow</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#E36209;">window</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">width</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">height</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glViewport</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, width, height);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">processInput</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">GLFWwindow</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#E36209;">window</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">glfwGetKey</span><span style="color:#24292E;">(window, GLFW_KEY_ESCAPE) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> GLFW_PRESS)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glfwSetWindowShouldClose</span><span style="color:#24292E;">(window, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">glfwInit</span><span style="color:#24292E;">())</span><span style="color:#6A737D;"> // 初始化 GLFW</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::cerr </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Could not initialize GLFW!&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::endl;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 配置 GLFW</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glfwWindowHint</span><span style="color:#24292E;">(GLFW_CONTEXT_VERSION_MAJOR, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glfwWindowHint</span><span style="color:#24292E;">(GLFW_CONTEXT_VERSION_MINOR, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glfwWindowHint</span><span style="color:#24292E;">(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glfwWindowHint</span><span style="color:#24292E;">(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);</span><span style="color:#6A737D;"> // for macOS</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 创建窗口</span></span>
<span class="line"><span style="color:#24292E;">    GLFWwindow </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">window </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">glfwCreateWindow</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">800</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">600</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;CG Tutorial&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (window </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::cout </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Failed to create GLFW window&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::endl;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glfwTerminate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 通知 GLFW 将我们窗口的上下文设置为当前线程的主上下文</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glfwMakeContextCurrent</span><span style="color:#24292E;">(window);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 初始化 GLAD</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">gladLoadGLLoader</span><span style="color:#24292E;">((GLADloadproc)glfwGetProcAddress))</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::cout </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Failed to initialize GLAD&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::endl;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 告诉 OpenGL 渲染窗口的尺寸大小，即视口</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glViewport</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">800</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">600</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">    // 告诉 GLFW 我们希望每当窗口调整大小的时候调用这个函数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glfwSetFramebufferSizeCallback</span><span style="color:#24292E;">(window, framebuffer_size_callback);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 渲染循环</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">glfwWindowShouldClose</span><span style="color:#24292E;">(window))</span><span style="color:#6A737D;"> // 检查一次 GLFW 是否被要求退出</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#6A737D;">        // 输入</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">processInput</span><span style="color:#24292E;">(window);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">        // 渲染指令</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glClearColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0.2</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.3</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.3</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1.0</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glClear</span><span style="color:#24292E;">(GL_COLOR_BUFFER_BIT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">        // 检查并调用事件，交换缓冲</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glfwSwapBuffers</span><span style="color:#24292E;">(window);</span><span style="color:#6A737D;"> // 交换颜色缓冲</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glfwPollEvents</span><span style="color:#24292E;">();</span><span style="color:#6A737D;">        // 函数检查有没有触发什么事件、更新窗口状态，并调用对应的回调函数</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glfwTerminate</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="着色器程序" tabindex="-1">着色器程序 <a class="header-anchor" href="#着色器程序" aria-label="Permalink to &quot;着色器程序&quot;">​</a></h2><p>现代 OpenGL 需要我们至少设置一个顶点和一个片段着色器。</p><p>在示例中，我们在顶点着色器中使用 <code>layout(location = 0)</code> 把顶点属性的位置值设置为 0，同时在配置数据的部分通过 glVertexAttribPointer() 函数指定我们要配置的顶点属性也写入 0，以便把数据传递到这一个顶点属性中。</p><p>片段着色器所做的是计算像素最后的颜色输出。</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">STRINGIZE</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">) #x</span></span>
<span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SHADER_STRING</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">text</span><span style="color:#E1E4E8;">) STRINGIZE(text)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string vertexString </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SHADER_STRING</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#6A737D;">    // 设定了输入变量的位置值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">layout</span><span style="color:#E1E4E8;">(location </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) in vec3 aPos;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">        // 为了设置顶点着色器的输出，我们必须把位置数据赋值给预定义的 gl_Position 变量，它在幕后是 vec4 类型的</span></span>
<span class="line"><span style="color:#6A737D;">        // 在真实的程序里输入数据通常都不是标准化设备坐标，所以我们首先必须先把它们转换至 OpenGL 的可视区域内</span></span>
<span class="line"><span style="color:#E1E4E8;">        gl_Position </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">vec4</span><span style="color:#E1E4E8;">(aPos.x, aPos.y, aPos.z, </span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string fragString </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SHADER_STRING</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#6A737D;">    // 片段着色器只需要一个输出变量，这个变量是一个 4 分量向量，它表示的是最终的输出颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">    out vec4 FragColor;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        FragColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">vec4</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1.0</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.2</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1.0</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createProgram</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">vertexSource</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">fragmentSource</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string preString </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    #version 330 </span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string vertexCombineSource </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> preString </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> vertexSource;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string fragmentCombineSource </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> preString </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> fragmentSource;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">vertexResultStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vertexCombineSource.</span><span style="color:#B392F0;">c_str</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">fragmentResultStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fragmentCombineSource.</span><span style="color:#B392F0;">c_str</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 编译顶点着色器</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">unsigned</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> vertexShader;</span></span>
<span class="line"><span style="color:#E1E4E8;">    vertexShader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">glCreateShader</span><span style="color:#E1E4E8;">(GL_VERTEX_SHADER);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glShaderSource</span><span style="color:#E1E4E8;">(vertexShader, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">vertexResultStr, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glCompileShader</span><span style="color:#E1E4E8;">(vertexShader);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 编译片段着色器</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">unsigned</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> fragmentShader;</span></span>
<span class="line"><span style="color:#E1E4E8;">    fragmentShader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">glCreateShader</span><span style="color:#E1E4E8;">(GL_FRAGMENT_SHADER);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glShaderSource</span><span style="color:#E1E4E8;">(fragmentShader, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">fragmentResultStr, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glCompileShader</span><span style="color:#E1E4E8;">(fragmentShader);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">unsigned</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> shaderProgram;</span></span>
<span class="line"><span style="color:#E1E4E8;">    shaderProgram </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">glCreateProgram</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glAttachShader</span><span style="color:#E1E4E8;">(shaderProgram, vertexShader);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glAttachShader</span><span style="color:#E1E4E8;">(shaderProgram, fragmentShader);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glLinkProgram</span><span style="color:#E1E4E8;">(shaderProgram);</span></span>
<span class="line"><span style="color:#6A737D;">    // (glUseProgram(shaderProgram)); // 激活程序对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glDeleteShader</span><span style="color:#E1E4E8;">(vertexShader);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glDeleteShader</span><span style="color:#E1E4E8;">(fragmentShader);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> shaderProgram;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">STRINGIZE</span><span style="color:#24292E;">(</span><span style="color:#E36209;">x</span><span style="color:#24292E;">) #x</span></span>
<span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SHADER_STRING</span><span style="color:#24292E;">(</span><span style="color:#E36209;">text</span><span style="color:#24292E;">) STRINGIZE(text)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string vertexString </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SHADER_STRING</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#6A737D;">    // 设定了输入变量的位置值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">layout</span><span style="color:#24292E;">(location </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) in vec3 aPos;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#6A737D;">        // 为了设置顶点着色器的输出，我们必须把位置数据赋值给预定义的 gl_Position 变量，它在幕后是 vec4 类型的</span></span>
<span class="line"><span style="color:#6A737D;">        // 在真实的程序里输入数据通常都不是标准化设备坐标，所以我们首先必须先把它们转换至 OpenGL 的可视区域内</span></span>
<span class="line"><span style="color:#24292E;">        gl_Position </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">vec4</span><span style="color:#24292E;">(aPos.x, aPos.y, aPos.z, </span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string fragString </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SHADER_STRING</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#6A737D;">    // 片段着色器只需要一个输出变量，这个变量是一个 4 分量向量，它表示的是最终的输出颜色</span></span>
<span class="line"><span style="color:#24292E;">    out vec4 FragColor;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        FragColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">vec4</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1.0</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.2</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1.0</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createProgram</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">vertexSource</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">fragmentSource</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string preString </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\\</span></span>
<span class="line"><span style="color:#032F62;">    #version 330 </span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">\\</span></span>
<span class="line"><span style="color:#032F62;">    &quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string vertexCombineSource </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> preString </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> vertexSource;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string fragmentCombineSource </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> preString </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> fragmentSource;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">vertexResultStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vertexCombineSource.</span><span style="color:#6F42C1;">c_str</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">fragmentResultStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fragmentCombineSource.</span><span style="color:#6F42C1;">c_str</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 编译顶点着色器</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">unsigned</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> vertexShader;</span></span>
<span class="line"><span style="color:#24292E;">    vertexShader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">glCreateShader</span><span style="color:#24292E;">(GL_VERTEX_SHADER);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glShaderSource</span><span style="color:#24292E;">(vertexShader, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">vertexResultStr, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glCompileShader</span><span style="color:#24292E;">(vertexShader);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 编译片段着色器</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">unsigned</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> fragmentShader;</span></span>
<span class="line"><span style="color:#24292E;">    fragmentShader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">glCreateShader</span><span style="color:#24292E;">(GL_FRAGMENT_SHADER);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glShaderSource</span><span style="color:#24292E;">(fragmentShader, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">fragmentResultStr, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glCompileShader</span><span style="color:#24292E;">(fragmentShader);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">unsigned</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> shaderProgram;</span></span>
<span class="line"><span style="color:#24292E;">    shaderProgram </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">glCreateProgram</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glAttachShader</span><span style="color:#24292E;">(shaderProgram, vertexShader);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glAttachShader</span><span style="color:#24292E;">(shaderProgram, fragmentShader);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glLinkProgram</span><span style="color:#24292E;">(shaderProgram);</span></span>
<span class="line"><span style="color:#6A737D;">    // (glUseProgram(shaderProgram)); // 激活程序对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glDeleteShader</span><span style="color:#24292E;">(vertexShader);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glDeleteShader</span><span style="color:#24292E;">(fragmentShader);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> shaderProgram;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="顶点数据" tabindex="-1">顶点数据 <a class="header-anchor" href="#顶点数据" aria-label="Permalink to &quot;顶点数据&quot;">​</a></h2><p>开始绘制图形之前，我们需要先给 OpenGL 输入一些顶点数据。</p><p>顶点着色器允许我们指定任何以顶点属性为形式的输入。这使其具有很强的灵活性的同时，它还的确意味着我们必须手动指定输入数据的哪一个部分对应顶点着色器的哪一个顶点属性。所以，我们必须在渲染前指定 OpenGL 该如何解释顶点数据。</p><p>为了避免重复设置相同的顶点属性，可以使用顶点数组对象，它可以像顶点缓冲对象那样被绑定，任何随后的顶点属性调用都会储存在这个 VAO 中。当配置顶点属性指针时，就只需要将那些调用执行一次，之后再绘制物体的时候只需要绑定相应的 VAO 就行了。</p><p>更进一步，为了提高顶点的复用率，我们可以使用元素缓冲区对象通过设定绘制顶点的顺序来重复利用相同的顶点，和 VBO 类似，我们会把这些函数调用放在绑定和解绑函数调用之间。</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createVAO</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;"> vertices[] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.0</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">,</span><span style="color:#6A737D;">   // 右上角</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.0</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">,</span><span style="color:#6A737D;">  // 右下角</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.0</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">,</span><span style="color:#6A737D;"> // 左下角</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.5</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.0</span><span style="color:#F97583;">f</span><span style="color:#6A737D;">   // 左上角</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">unsigned</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> indices[] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span><span style="color:#6A737D;"> // 第一个三角形</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#6A737D;">  // 第二个三角形</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 生成一个 VBO 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">unsigned</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> VBO;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glGenBuffers</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">VBO);</span></span>
<span class="line"><span style="color:#6A737D;">    // 生成一个 EBO 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">unsigned</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> EBO;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glGenBuffers</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">EBO);</span></span>
<span class="line"><span style="color:#6A737D;">    // 生成一个 VAO 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">unsigned</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> VAO;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glGenVertexArrays</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">VAO);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 绑定 VAO</span></span>
<span class="line"><span style="color:#6A737D;">    // 顶点数组对象可以像顶点缓冲对象那样被绑定，任何随后的顶点属性调用都会储存在这个 VAO 中</span></span>
<span class="line"><span style="color:#6A737D;">    // 通过 VAO，当配置顶点属性指针时，你只需要将那些调用执行一次，之后再绘制物体的时候只需要绑定相应的 VAO 即可</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glBindVertexArray</span><span style="color:#E1E4E8;">(VAO);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 绑定缓冲类型（此处是元素缓冲区对象），把索引数据复制到缓冲的内存中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glBindBuffer</span><span style="color:#E1E4E8;">(GL_ELEMENT_ARRAY_BUFFER, EBO);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glBufferData</span><span style="color:#E1E4E8;">(GL_ELEMENT_ARRAY_BUFFER, </span><span style="color:#F97583;">sizeof</span><span style="color:#E1E4E8;">(indices), indices, GL_STATIC_DRAW);</span></span>
<span class="line"><span style="color:#6A737D;">    // 绑定缓冲类型（此处是顶点缓冲对象），把顶点数据复制到缓冲的内存中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glBindBuffer</span><span style="color:#E1E4E8;">(GL_ARRAY_BUFFER, VBO);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glBufferData</span><span style="color:#E1E4E8;">(GL_ARRAY_BUFFER, </span><span style="color:#F97583;">sizeof</span><span style="color:#E1E4E8;">(vertices), vertices, GL_STATIC_DRAW);</span></span>
<span class="line"><span style="color:#6A737D;">    // 告诉 OpenGL 该如何解析顶点数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glVertexAttribPointer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#6A737D;"> /* 指定要配置的顶点属性 */</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                          </span><span style="color:#79B8FF;">3</span><span style="color:#6A737D;"> /* 顶点属性的大小 */</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                          GL_FLOAT</span><span style="color:#6A737D;"> /* 数据的类型 */</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                          GL_FALSE</span><span style="color:#6A737D;"> /* 是否标准化 */</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                          </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">sizeof</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">float</span><span style="color:#E1E4E8;">)</span><span style="color:#6A737D;"> /* 步长 */</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                          (</span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">)</span><span style="color:#79B8FF;">0</span><span style="color:#6A737D;"> /* 位置数据在缓冲中起始位置的偏移量 */</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">    // 启用顶点属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glEnableVertexAttribArray</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glBindBuffer</span><span style="color:#E1E4E8;">(GL_ARRAY_BUFFER, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;"> // 解除绑定的顶点缓冲区对象</span></span>
<span class="line"><span style="color:#6A737D;">    // glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0); // 当 VAO 是活动的时，不解除对 EBO 的绑定</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 解绑 VAO</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">glBindVertexArray</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> VAO;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createVAO</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">float</span><span style="color:#24292E;"> vertices[] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.0</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">,</span><span style="color:#6A737D;">   // 右上角</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.0</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">,</span><span style="color:#6A737D;">  // 右下角</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.0</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">,</span><span style="color:#6A737D;"> // 左下角</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.5</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.0</span><span style="color:#D73A49;">f</span><span style="color:#6A737D;">   // 左上角</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">unsigned</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> indices[] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span><span style="color:#6A737D;"> // 第一个三角形</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#6A737D;">  // 第二个三角形</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 生成一个 VBO 对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">unsigned</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> VBO;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glGenBuffers</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">VBO);</span></span>
<span class="line"><span style="color:#6A737D;">    // 生成一个 EBO 对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">unsigned</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> EBO;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glGenBuffers</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">EBO);</span></span>
<span class="line"><span style="color:#6A737D;">    // 生成一个 VAO 对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">unsigned</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> VAO;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glGenVertexArrays</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">VAO);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 绑定 VAO</span></span>
<span class="line"><span style="color:#6A737D;">    // 顶点数组对象可以像顶点缓冲对象那样被绑定，任何随后的顶点属性调用都会储存在这个 VAO 中</span></span>
<span class="line"><span style="color:#6A737D;">    // 通过 VAO，当配置顶点属性指针时，你只需要将那些调用执行一次，之后再绘制物体的时候只需要绑定相应的 VAO 即可</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glBindVertexArray</span><span style="color:#24292E;">(VAO);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 绑定缓冲类型（此处是元素缓冲区对象），把索引数据复制到缓冲的内存中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glBindBuffer</span><span style="color:#24292E;">(GL_ELEMENT_ARRAY_BUFFER, EBO);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glBufferData</span><span style="color:#24292E;">(GL_ELEMENT_ARRAY_BUFFER, </span><span style="color:#D73A49;">sizeof</span><span style="color:#24292E;">(indices), indices, GL_STATIC_DRAW);</span></span>
<span class="line"><span style="color:#6A737D;">    // 绑定缓冲类型（此处是顶点缓冲对象），把顶点数据复制到缓冲的内存中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glBindBuffer</span><span style="color:#24292E;">(GL_ARRAY_BUFFER, VBO);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glBufferData</span><span style="color:#24292E;">(GL_ARRAY_BUFFER, </span><span style="color:#D73A49;">sizeof</span><span style="color:#24292E;">(vertices), vertices, GL_STATIC_DRAW);</span></span>
<span class="line"><span style="color:#6A737D;">    // 告诉 OpenGL 该如何解析顶点数据</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glVertexAttribPointer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#6A737D;"> /* 指定要配置的顶点属性 */</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                          </span><span style="color:#005CC5;">3</span><span style="color:#6A737D;"> /* 顶点属性的大小 */</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                          GL_FLOAT</span><span style="color:#6A737D;"> /* 数据的类型 */</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                          GL_FALSE</span><span style="color:#6A737D;"> /* 是否标准化 */</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                          </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">sizeof</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">float</span><span style="color:#24292E;">)</span><span style="color:#6A737D;"> /* 步长 */</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                          (</span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">)</span><span style="color:#005CC5;">0</span><span style="color:#6A737D;"> /* 位置数据在缓冲中起始位置的偏移量 */</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">    // 启用顶点属性</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glEnableVertexAttribArray</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glBindBuffer</span><span style="color:#24292E;">(GL_ARRAY_BUFFER, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span><span style="color:#6A737D;"> // 解除绑定的顶点缓冲区对象</span></span>
<span class="line"><span style="color:#6A737D;">    // glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0); // 当 VAO 是活动的时，不解除对 EBO 的绑定</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 解绑 VAO</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">glBindVertexArray</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> VAO;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="渲染" tabindex="-1">渲染 <a class="header-anchor" href="#渲染" aria-label="Permalink to &quot;渲染&quot;">​</a></h2><p>在准备好程序和数据之后，我们就可以开始渲染了。</p><p>首先，我们在渲染指令中通过 glUseProgram() 函数激活创建的着色器程序对象，并通过 glBindVertexArray() 绑定 VAO。</p><p>由于传递了 GL_ELEMENT_ARRAY_BUFFER 当作缓冲目标，所以我们需要用 glDrawElements() 来替换 glDrawArrays() 函数进行绘制。</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // ...</span></span>
<span class="line"><span style="color:#6A737D;">    // 创建并编译着色器程序</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> shaderProgram </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createProgram</span><span style="color:#E1E4E8;">(vertexString, fragString);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> VAO </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createVAO</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 渲染循环</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">glfwWindowShouldClose</span><span style="color:#E1E4E8;">(window))</span><span style="color:#6A737D;"> // 检查一次 GLFW 是否被要求退出</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#6A737D;">        // ...</span></span>
<span class="line"><span style="color:#6A737D;">        // 渲染指令</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glClearColor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0.2</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.3</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.3</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1.0</span><span style="color:#F97583;">f</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glClear</span><span style="color:#E1E4E8;">(GL_COLOR_BUFFER_BIT);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glUseProgram</span><span style="color:#E1E4E8;">(shaderProgram);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glBindVertexArray</span><span style="color:#E1E4E8;">(VAO);</span></span>
<span class="line"><span style="color:#6A737D;">        // glDrawArrays(GL_TRIANGLES, 0, 3);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">glDrawElements</span><span style="color:#E1E4E8;">(GL_TRIANGLES, </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">, GL_UNSIGNED_INT, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">        // ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#6A737D;">    // ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // ...</span></span>
<span class="line"><span style="color:#6A737D;">    // 创建并编译着色器程序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> shaderProgram </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createProgram</span><span style="color:#24292E;">(vertexString, fragString);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> VAO </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createVAO</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 渲染循环</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">glfwWindowShouldClose</span><span style="color:#24292E;">(window))</span><span style="color:#6A737D;"> // 检查一次 GLFW 是否被要求退出</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#6A737D;">        // ...</span></span>
<span class="line"><span style="color:#6A737D;">        // 渲染指令</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glClearColor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0.2</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.3</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.3</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1.0</span><span style="color:#D73A49;">f</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glClear</span><span style="color:#24292E;">(GL_COLOR_BUFFER_BIT);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glUseProgram</span><span style="color:#24292E;">(shaderProgram);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glBindVertexArray</span><span style="color:#24292E;">(VAO);</span></span>
<span class="line"><span style="color:#6A737D;">        // glDrawArrays(GL_TRIANGLES, 0, 3);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">glDrawElements</span><span style="color:#24292E;">(GL_TRIANGLES, </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">, GL_UNSIGNED_INT, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">        // ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#6A737D;">    // ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>现在，我们通过绘制 2 个三角形完成了一个矩形的绘制。</p>`,25),e=[o];function c(r,t,E,y,i,F){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{C as __pageData,d as default};
