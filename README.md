
预览demo [https://klz-portfolio.pages.dev/](https://klz-portfolio.pages.dev/)

创意来自 [Naresh Khatri](https://www.nareshkhatri.site/)

### 工作流
- 从 `yarn create vite` 创建项目
- 在blender中搭建模型，导出给threejs editor或者项目测试环境测试效果
- 在three中添加灯光，以避免blender中灯光参数差异
- 在blender中处理模型层次关系以便导出的glb能够在three中正常使用
- 在blender中给每个键帽添加动画并区分
- 在three中获取键帽模型及其对应动画，为动画添加交互，编排波动动画
- 处理组件层级关系


### misc
- 背景和卡片效果来自aceternity ui
- 部分组件来自shadcn/ui
- 单个键帽包含两个动画，分别用于波动动画和按下动作
- 波动动画是从模型中取出对应动画后重新编排得到的
- 波动动画可以设定反向播放，通过修改单个键帽的播放延迟实现
- 摄像机平滑缩放动画是在three中实现的
- 通过useFrame逐帧控制相机实现平滑处理
- 呼吸浮动动画是在blender中制作的并在初始化后持续播放
- 键帽上的logo图片是真实的mesh，通过缩裹修改器贴合在键帽表面
- 为了防止logo阻挡鼠标动作，在取得键帽模型的同时通过父级关系找到logo并将其raycast设为空函数
- 各个技术栈logo是我用ps手动处理的仿二值化图标，只是带有透明通道的完全白色图标，有些图标为了适配风格做了重新设计（比如vite）
