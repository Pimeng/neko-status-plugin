import Config from "./components/Config.js";
import lodash from "lodash";
import path from "path";
import { pluginRoot } from "./model/path.js";

export function supportGuoba() {
  return {
    pluginInfo: {
      name: 'neko-status-plugin',
      title: '猫猫状态插件',
      author: ['@erzaozi', '@CikeyQi'],
      authorLink: ['https://github.com/erzaozi', 'https://github.com/CikeyQi'],
      link: 'https://github.com/erzaozi/neko-status-plugin',
      isV3: true,
      isV2: false,
      showInMenu: true,
      description: '基于 Yunzai 的机器人状态查看插件',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'noto-v1:cat',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: path.join(pluginRoot, 'resources/readme/girl.png'),
    },
    configInfo: {
      schemas: [
        {
          field: "use_template",
          label: "使用模板",
          bottomHelpMessage: "选择一个模板来展示系统状态",
          component: "Select",
          componentProps: {
            options: Config.getTemplate(),
          },
        },
        {
          field: "headimg_url",
          label: "头图地址",
          bottomHelpMessage: "输入一个图片地址来作为头图",
          component: "Input",
          componentProps: {
            placeholder: '图片地址，请自行测试是否有效',
          },
        },
        {
          field: "shell",
          label: "自定义展示内容",
          bottomHelpMessage: "自定义展示内容",
          component: "GSubForm",
          componentProps: {
            multiple: true,
            schemas: [
              {
                field: "name",
                label: "自定义展示内容名",
                component: "Input",
                required: true,
                componentProps: {
                  placeholder: '请输入展示内容名',
                },
              },
              {
                field: "command",
                label: "shell命令",
                component: "Input",
                required: true,
                componentProps: {
                  placeholder: '请输入展示内容名',
                },
              },
            ],
          },
        },
      ],
      getConfigData() {
        let config = Config.getConfig()
        return config
      },

      setConfigData(data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, Config.getConfig(), config)
        Config.setConfig(config)
        return Result.ok({}, '保存成功~')
      },
    },
  }
}