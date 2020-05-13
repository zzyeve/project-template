<template>
	<div class="header">
		<el-breadcrumb separator-class="el-icon-arrow-right" v-if="header == 'breadcrumb'">
			<el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{$t(item.name)}}</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nav" v-if="header == 'nav'">
			<div class="product">
				<text-logo class="text-logo" :name="product.name"></text-logo>
				<span>{{product.name}}</span>
			</div>
			<el-menu :default-active="defaultActive" class="el-menu" mode="horizontal" router>
				<el-menu-item v-auth="'product/bill/view'" index="bill" :route="{path: `/product/bill/list/${productNumber}`}">
					{{$t('product.bill')}}
				</el-menu-item>
				<el-menu-item v-auth="'product/collect/view'" index="collect"
											:route="{path: `/product/collect/list/${productNumber}`}">
					{{$t('product.collectionOrder')}}
				</el-menu-item>
				<el-menu-item v-auth="'product/remark/view'" index="remark"
											:route="{path: `/product/remark/list/${productNumber}`}">
					{{$t('product.collectionRecords')}}
				</el-menu-item>
				<el-menu-item v-auth="'product/audio/view'" index="audio"
											:route="{path: `/product/audio/list/${productNumber}`}">
					{{$t('product.recordings')}}
				</el-menu-item>
				<el-menu-item v-auth="'product/sync/view'" index="sync" :route="{path: `/product/sync/list/${productNumber}`}">
					{{$t('product.sync')}}
				</el-menu-item>
			</el-menu>
		</div>

		<div class="tool">
			<el-tooltip class="item" effect="dark" :content="$t('common.fullscreen')" placement="bottom">
				<div class="fullscreen" @click="toggle" v-if="showFullscreen">
					<i class="el-icon-full-screen" :class="{'normal': isFullscreen}"></i>
				</div>
			</el-tooltip>
			<el-dropdown trigger="click" @command="handleCommand">
				<span class="change-lang" >
					{{langList[$i18n.locale]}}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(key, value) in langList" :key="value" :command="value">
						{{key}}
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>

	</div>
</template>

<script>
    import Bus from "@/utils/bus"
    import screenfull from "screenfull"

    export default {
        data() {
            return {
                breadList: [],
                header: "breadcrumb",
                defaultActive: "",
                productId: storage.getProductId(),
                productNumber: storage.getProductNumber(),
                product: {},
                isFullscreen: false,
								showFullscreen: true,
								langList: { zh: "中文", en: "English" }
            }
        },
        watch: {
            $route: {
                handler(to, from) {
                    this.getBreadcrumb(to)
                },
                immediate: true
            }
        },
        mounted() {
            Bus.$on("addBreadcrumb", content => {
                this.getBreadcrumb(this.$route)
                this.breadList.push({path: "/", name: content})
            })
            this.screenfullListener()
        },
        destroyed() {
            Bus.$off("addBreadcrumb")
        },
        methods: {
						handleCommand(command) {
							storage.setLang(command)
							this.$i18n.locale = command;
						},

            getBreadcrumb(to) {
                let {matched} = to

                let filter = matched.filter(item => {
                    if (!item.name) {
                        return false
                    }

                    if (item.parent) {
                        return item.path != item.parent.redirect
                    }

                    return true
                })
                let home = [{name: 'common.current'}]
                this.breadList = [...home, ...filter]

                if (to.meta.header) {
                    this.header = to.meta.header
                    let arr = to.path.split("/")
                    this.defaultActive = arr[2]
                } else {
                    this.header = "breadcrumb"
                }
                this.productId = storage.getProductId()
                let productList = storage.getProduct() || [];
                productList.forEach(item => {
                    if (item.number == to.params.number) {
                        this.product = item;
                    }
                })
                this.productNumber = storage.getProductNumber()
            },

            screenfullListener() {
                if (screenfull.enabled) {
                    screenfull.on("change", () => {
                        this.isFullscreen = screenfull.isFullscreen
                    })
                } else {
                    this.showFullscreen = false
                }
            },
            /**
             * @description 切换全屏
             */
            toggle() {
                if (screenfull.isFullscreen) {
                    screenfull.exit()
                } else {
                    screenfull.request()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		z-index: 98;
		height: 50px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
	}

	.tool {
		padding-right: 20px;
		font-size: 16px;
		font-weight: 600;
		display: flex;
		.change-lang {
			display: inline-block;
			text-align: right;
			width: 85px;
			line-height: 28px;
			font-weight: 400;
			cursor: pointer;
		}

		.fullscreen {
			padding: 4px;

			i {
				transition: all 0.3s ease;

				&.normal {
					transform: rotate(45deg);
				}
			}
		}
	}

	.nav {
		display: flex;
		align-items: center;

		.product {
			display: flex;
			align-items: center;
			max-width: 150px;

			.text-logo {
				margin-right: 10px;
				flex-shrink: 0;
			}

			span {
				font-size: 14px;
				color: #666;
				flex: 1;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 12px;
			}
		}

		.el-menu {
			margin-left: 50px;
			border-bottom: none;

			.el-menu-item {
				height: 50px;
				line-height: 50px;
			}
		}
	}
</style>
