defaultawait(async () => {
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');

const __VLS_componentsOption = {};

let __VLS_name!: 'commentInfo';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'comment-info'?: boolean; } &
{ 'top'?: boolean; } &
{ 'name'?: boolean; } &
{ 'mid'?: boolean; } &
{ 'bottom'?: boolean; } &
{ 'huifu'?: boolean; } &
{ 'huifu'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'ElAvatar', typeof __VLS_localComponents, "ElAvatar", "elAvatar", "el-avatar"> &
__VLS_WithComponent<'CommentInfo', typeof __VLS_localComponents, "CommentInfo", "commentInfo", "comment-info">;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_components.ElAvatar; __VLS_components.elAvatar; __VLS_components["el-avatar"];
// @ts-ignore
[ElAvatar,];
__VLS_intrinsicElements.a; __VLS_intrinsicElements.a;
__VLS_intrinsicElements.p; __VLS_intrinsicElements.p;
__VLS_intrinsicElements.svg; __VLS_intrinsicElements.svg; __VLS_intrinsicElements.svg; __VLS_intrinsicElements.svg;
__VLS_intrinsicElements.g; __VLS_intrinsicElements.g; __VLS_intrinsicElements.g; __VLS_intrinsicElements.g;
__VLS_intrinsicElements.path; __VLS_intrinsicElements.path; __VLS_intrinsicElements.path; __VLS_intrinsicElements.path; __VLS_intrinsicElements.path; __VLS_intrinsicElements.path; __VLS_intrinsicElements.path; __VLS_intrinsicElements.path;
__VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span;
__VLS_components.CommentInfo; __VLS_components.CommentInfo; __VLS_components.commentInfo; __VLS_components.commentInfo; __VLS_components["comment-info"]; __VLS_components["comment-info"];
// @ts-ignore
[CommentInfo, CommentInfo,];
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, class: ("comment-info"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("comment-info"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = __VLS_intrinsicElements["div"];
const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
const __VLS_7 = __VLS_6({ ...{}, class: ("top"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("top"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = __VLS_intrinsicElements["div"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{}, class: ("avatar"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("avatar"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
let __VLS_15!: 'ElAvatar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.ElAvatar : 'elAvatar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.elAvatar : 'el-avatar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['el-avatar'] : typeof __VLS_resolvedLocalAndGlobalComponents['ElAvatar'];
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({ ...{}, size: ("large"), src: ("https://avatars.githubusercontent.com/u/106546816?v=4"), }));
({} as { ElAvatar: typeof __VLS_15; }).ElAvatar;
const __VLS_17 = __VLS_16({ ...{}, size: ("large"), src: ("https://avatars.githubusercontent.com/u/106546816?v=4"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, size: ("large"), src: ("https://avatars.githubusercontent.com/u/106546816?v=4"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
}
(__VLS_13.slots!).default;
}
{
const __VLS_20 = __VLS_intrinsicElements["div"];
const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
const __VLS_22 = __VLS_21({ ...{}, class: ("name"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, class: ("name"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
{
const __VLS_25 = __VLS_intrinsicElements["a"];
const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
const __VLS_27 = __VLS_26({ ...{}, href: ("/"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{}, href: ("/"), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
(__VLS_28.slots!).default;
}
(__VLS_23.slots!).default;
}
(__VLS_8.slots!).default;
}
{
const __VLS_30 = __VLS_intrinsicElements["div"];
const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
const __VLS_32 = __VLS_31({ ...{}, class: ("mid"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{}, class: ("mid"), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
{
const __VLS_35 = __VLS_intrinsicElements["p"];
const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
const __VLS_37 = __VLS_36({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
(__VLS_38.slots!).default;
}
(__VLS_33.slots!).default;
}
{
const __VLS_40 = __VLS_intrinsicElements["div"];
const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
const __VLS_42 = __VLS_41({ ...{}, class: ("bottom"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_40, typeof __VLS_42> & Record<string, unknown>) => void)({ ...{}, class: ("bottom"), });
const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42)!;
let __VLS_44!: __VLS_NormalizeEmits<typeof __VLS_43.emit>;
{
const __VLS_45 = __VLS_intrinsicElements["div"];
const __VLS_46 = __VLS_elementAsFunctionalComponent(__VLS_45);
const __VLS_47 = __VLS_46({ ...{}, class: ("dianzan"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_45, typeof __VLS_47> & Record<string, unknown>) => void)({ ...{}, class: ("dianzan"), });
const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47)!;
let __VLS_49!: __VLS_NormalizeEmits<typeof __VLS_48.emit>;
{
const __VLS_50 = __VLS_intrinsicElements["svg"];
const __VLS_51 = __VLS_elementAsFunctionalComponent(__VLS_50);
const __VLS_52 = __VLS_51({ ...{}, dataV79ba69ea: (""), focusable: ("false"), viewBox: ("0 0 1024 1024"), fill: ("currentColor"), width: ("14"), height: ("14"), "aria-hidden": ("true"), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_50, typeof __VLS_52> & Record<string, unknown>) => void)({ ...{}, dataV79ba69ea: (""), focusable: ("false"), viewBox: ("0 0 1024 1024"), fill: ("currentColor"), width: ("14"), height: ("14"), "aria-hidden": ("true"), });
const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52)!;
let __VLS_54!: __VLS_NormalizeEmits<typeof __VLS_53.emit>;
{
const __VLS_55 = __VLS_intrinsicElements["g"];
const __VLS_56 = __VLS_elementAsFunctionalComponent(__VLS_55);
const __VLS_57 = __VLS_56({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_56));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_55, typeof __VLS_57> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_58 = __VLS_pickFunctionalComponentCtx(__VLS_55, __VLS_57)!;
let __VLS_59!: __VLS_NormalizeEmits<typeof __VLS_58.emit>;
{
const __VLS_60 = __VLS_intrinsicElements["path"];
const __VLS_61 = __VLS_elementAsFunctionalComponent(__VLS_60);
const __VLS_62 = __VLS_61({ ...{}, d: ("M474.1731 112c-18.9701 0-36.1608 11.1725-43.8642 28.5082L280.1358 478.456A48 48 0 0 0 276 497.9478V911c0 26.5097 21.4903 48.0048 48 48.0048h436.252-.5357c61.3753.6784 113.8776-43.9592 123.0806-104.6476l51.798-337.8707c5.4294-35.7783-5.103-72.0607-28.7977-99.3154l-.7141-.8142c-23.4316-26.4793-57.1259-41.6043-92.483-41.513l-.6771.0041H634.802l.001-102.1987C634.803 183.9272 562.8878 112 474.173 112zm28.3009 102.514.506.2474c21.2353 10.5943 35.823 32.5364 35.823 57.8879v150.199c0 26.5097 21.4903 48 48 48l225.5324-.0008.2727-.0023c7.9422-.0903 15.5267 3.3143 20.7399 9.311a27.109 27.109 0 0 1 6.3445 21.855l-51.7987 337.8756c-2.0178 13.3058-13.3664 23.0703-26.6996 23.1177H372V508.131l130.474-293.617z"), }, ...__VLS_functionalComponentArgsRest(__VLS_61));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_60, typeof __VLS_62> & Record<string, unknown>) => void)({ ...{}, d: ("M474.1731 112c-18.9701 0-36.1608 11.1725-43.8642 28.5082L280.1358 478.456A48 48 0 0 0 276 497.9478V911c0 26.5097 21.4903 48.0048 48 48.0048h436.252-.5357c61.3753.6784 113.8776-43.9592 123.0806-104.6476l51.798-337.8707c5.4294-35.7783-5.103-72.0607-28.7977-99.3154l-.7141-.8142c-23.4316-26.4793-57.1259-41.6043-92.483-41.513l-.6771.0041H634.802l.001-102.1987C634.803 183.9272 562.8878 112 474.173 112zm28.3009 102.514.506.2474c21.2353 10.5943 35.823 32.5364 35.823 57.8879v150.199c0 26.5097 21.4903 48 48 48l225.5324-.0008.2727-.0023c7.9422-.0903 15.5267 3.3143 20.7399 9.311a27.109 27.109 0 0 1 6.3445 21.855l-51.7987 337.8756c-2.0178 13.3058-13.3664 23.0703-26.6996 23.1177H372V508.131l130.474-293.617z"), });
const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62)!;
let __VLS_64!: __VLS_NormalizeEmits<typeof __VLS_63.emit>;
}
{
const __VLS_65 = __VLS_intrinsicElements["path"];
const __VLS_66 = __VLS_elementAsFunctionalComponent(__VLS_65);
const __VLS_67 = __VLS_66({ ...{}, d: ("m223.832 445.012.6254.0078c-68.3137-1.209-126.8272 52.9355-136.0247 120.9665A48 48 0 0 0 88 572.4172v263.3314a48 48 0 0 0 .4327 6.431l.2898 2.0287c9.9457 66.0991 66.8558 114.9731 133.686 114.7918l1.2675-.0141 100.324.0002c26.5097 0 48-21.4903 48-48v-417.974l-.0064-.7937c-.424-26.1436-21.749-47.2062-47.9936-47.2062l-100.168-.0003zm-2.1548 95.9942.5068-.0062 1.424.0123L276 541.012v321.974l-52.392.0002-.4247.0019-1.0148.012c-18.4628.0497-34.3058-12.9072-38.0996-30.7884L184 831.879V576.243l.1115-.5453c4.0676-19.3121 20.8022-34.351 37.5657-34.6915z"), }, ...__VLS_functionalComponentArgsRest(__VLS_66));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_65, typeof __VLS_67> & Record<string, unknown>) => void)({ ...{}, d: ("m223.832 445.012.6254.0078c-68.3137-1.209-126.8272 52.9355-136.0247 120.9665A48 48 0 0 0 88 572.4172v263.3314a48 48 0 0 0 .4327 6.431l.2898 2.0287c9.9457 66.0991 66.8558 114.9731 133.686 114.7918l1.2675-.0141 100.324.0002c26.5097 0 48-21.4903 48-48v-417.974l-.0064-.7937c-.424-26.1436-21.749-47.2062-47.9936-47.2062l-100.168-.0003zm-2.1548 95.9942.5068-.0062 1.424.0123L276 541.012v321.974l-52.392.0002-.4247.0019-1.0148.012c-18.4628.0497-34.3058-12.9072-38.0996-30.7884L184 831.879V576.243l.1115-.5453c4.0676-19.3121 20.8022-34.351 37.5657-34.6915z"), });
const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_65, __VLS_67)!;
let __VLS_69!: __VLS_NormalizeEmits<typeof __VLS_68.emit>;
}
(__VLS_58.slots!).default;
}
(__VLS_53.slots!).default;
}
{
const __VLS_70 = __VLS_intrinsicElements["span"];
const __VLS_71 = __VLS_elementAsFunctionalComponent(__VLS_70);
const __VLS_72 = __VLS_71({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_71));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_70, typeof __VLS_72> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72)!;
let __VLS_74!: __VLS_NormalizeEmits<typeof __VLS_73.emit>;
(__VLS_73.slots!).default;
}
{
const __VLS_75 = __VLS_intrinsicElements["span"];
const __VLS_76 = __VLS_elementAsFunctionalComponent(__VLS_75);
const __VLS_77 = __VLS_76({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_76));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_75, typeof __VLS_77> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_78 = __VLS_pickFunctionalComponentCtx(__VLS_75, __VLS_77)!;
let __VLS_79!: __VLS_NormalizeEmits<typeof __VLS_78.emit>;
(__VLS_78.slots!).default;
}
(__VLS_48.slots!).default;
}
{
const __VLS_80 = __VLS_intrinsicElements["div"];
const __VLS_81 = __VLS_elementAsFunctionalComponent(__VLS_80);
const __VLS_82 = __VLS_81({ ...{}, class: ("huifu"), }, ...__VLS_functionalComponentArgsRest(__VLS_81));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_80, typeof __VLS_82> & Record<string, unknown>) => void)({ ...{}, class: ("huifu"), });
const __VLS_83 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82)!;
let __VLS_84!: __VLS_NormalizeEmits<typeof __VLS_83.emit>;
{
const __VLS_85 = __VLS_intrinsicElements["svg"];
const __VLS_86 = __VLS_elementAsFunctionalComponent(__VLS_85);
const __VLS_87 = __VLS_86({ ...{}, dataV79ba69ea: (""), focusable: ("false"), viewBox: ("0 0 1024 1024"), fill: ("currentColor"), width: ("14"), height: ("14"), "aria-hidden": ("true"), }, ...__VLS_functionalComponentArgsRest(__VLS_86));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_85, typeof __VLS_87> & Record<string, unknown>) => void)({ ...{}, dataV79ba69ea: (""), focusable: ("false"), viewBox: ("0 0 1024 1024"), fill: ("currentColor"), width: ("14"), height: ("14"), "aria-hidden": ("true"), });
const __VLS_88 = __VLS_pickFunctionalComponentCtx(__VLS_85, __VLS_87)!;
let __VLS_89!: __VLS_NormalizeEmits<typeof __VLS_88.emit>;
{
const __VLS_90 = __VLS_intrinsicElements["g"];
const __VLS_91 = __VLS_elementAsFunctionalComponent(__VLS_90);
const __VLS_92 = __VLS_91({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_91));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_90, typeof __VLS_92> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_93 = __VLS_pickFunctionalComponentCtx(__VLS_90, __VLS_92)!;
let __VLS_94!: __VLS_NormalizeEmits<typeof __VLS_93.emit>;
{
const __VLS_95 = __VLS_intrinsicElements["path"];
const __VLS_96 = __VLS_elementAsFunctionalComponent(__VLS_95);
const __VLS_97 = __VLS_96({ ...{}, d: ("M815 164H209c-79.529 0-144 64.471-144 144v406.2857l.0193 2.3813C66.2909 795.0977 130.2663 858.2857 209 858.2857l35.549-.0007.001 20.1563c0 44.1827 35.8172 80 80 80h.797a80.04 80.04 0 0 0 41.9912-12.4044L505.965 858.285l309.035.0007c79.529 0 144-64.471 144-144V308c0-79.529-64.471-144-144-144zm-606 96h606c26.5097 0 48 21.4903 48 48v406.2857c0 26.5097-21.4903 48-48 48H492.05l-.649.0044a48 48 0 0 0-25.0239 7.4382L340.549 849.377l.001-39.0913c0-26.5097-21.4903-48-48-48H209c-26.5097 0-48-21.4903-48-48V308c0-26.5097 21.4903-48 48-48z"), }, ...__VLS_functionalComponentArgsRest(__VLS_96));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_95, typeof __VLS_97> & Record<string, unknown>) => void)({ ...{}, d: ("M815 164H209c-79.529 0-144 64.471-144 144v406.2857l.0193 2.3813C66.2909 795.0977 130.2663 858.2857 209 858.2857l35.549-.0007.001 20.1563c0 44.1827 35.8172 80 80 80h.797a80.04 80.04 0 0 0 41.9912-12.4044L505.965 858.285l309.035.0007c79.529 0 144-64.471 144-144V308c0-79.529-64.471-144-144-144zm-606 96h606c26.5097 0 48 21.4903 48 48v406.2857c0 26.5097-21.4903 48-48 48H492.05l-.649.0044a48 48 0 0 0-25.0239 7.4382L340.549 849.377l.001-39.0913c0-26.5097-21.4903-48-48-48H209c-26.5097 0-48-21.4903-48-48V308c0-26.5097 21.4903-48 48-48z"), });
const __VLS_98 = __VLS_pickFunctionalComponentCtx(__VLS_95, __VLS_97)!;
let __VLS_99!: __VLS_NormalizeEmits<typeof __VLS_98.emit>;
}
{
const __VLS_100 = __VLS_intrinsicElements["path"];
const __VLS_101 = __VLS_elementAsFunctionalComponent(__VLS_100);
const __VLS_102 = __VLS_101({ ...{}, d: ("M313 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L361 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L265 541v-59c0-26.5097 21.4903-48 48-48zM513 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L561 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L465 541v-59c0-26.5097 21.4903-48 48-48zM711 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L759 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L663 541v-59c0-26.5097 21.4903-48 48-48z"), }, ...__VLS_functionalComponentArgsRest(__VLS_101));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_100, typeof __VLS_102> & Record<string, unknown>) => void)({ ...{}, d: ("M313 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L361 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L265 541v-59c0-26.5097 21.4903-48 48-48zM513 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L561 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L465 541v-59c0-26.5097 21.4903-48 48-48zM711 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L759 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L663 541v-59c0-26.5097 21.4903-48 48-48z"), });
const __VLS_103 = __VLS_pickFunctionalComponentCtx(__VLS_100, __VLS_102)!;
let __VLS_104!: __VLS_NormalizeEmits<typeof __VLS_103.emit>;
}
(__VLS_93.slots!).default;
}
(__VLS_88.slots!).default;
}
{
const __VLS_105 = __VLS_intrinsicElements["span"];
const __VLS_106 = __VLS_elementAsFunctionalComponent(__VLS_105);
const __VLS_107 = __VLS_106({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_106));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_105, typeof __VLS_107> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_108 = __VLS_pickFunctionalComponentCtx(__VLS_105, __VLS_107)!;
let __VLS_109!: __VLS_NormalizeEmits<typeof __VLS_108.emit>;
(__VLS_108.slots!).default;
}
{
const __VLS_110 = __VLS_intrinsicElements["span"];
const __VLS_111 = __VLS_elementAsFunctionalComponent(__VLS_110);
const __VLS_112 = __VLS_111({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_111));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_110, typeof __VLS_112> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_113 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112)!;
let __VLS_114!: __VLS_NormalizeEmits<typeof __VLS_113.emit>;
(__VLS_113.slots!).default;
}
(__VLS_83.slots!).default;
}
{
const __VLS_115 = __VLS_intrinsicElements["div"];
const __VLS_116 = __VLS_elementAsFunctionalComponent(__VLS_115);
const __VLS_117 = __VLS_116({ ...{}, class: ("info"), }, ...__VLS_functionalComponentArgsRest(__VLS_116));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_115, typeof __VLS_117> & Record<string, unknown>) => void)({ ...{}, class: ("info"), });
const __VLS_118 = __VLS_pickFunctionalComponentCtx(__VLS_115, __VLS_117)!;
let __VLS_119!: __VLS_NormalizeEmits<typeof __VLS_118.emit>;
{
const __VLS_120 = __VLS_intrinsicElements["span"];
const __VLS_121 = __VLS_elementAsFunctionalComponent(__VLS_120);
const __VLS_122 = __VLS_121({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_121));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_120, typeof __VLS_122> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_123 = __VLS_pickFunctionalComponentCtx(__VLS_120, __VLS_122)!;
let __VLS_124!: __VLS_NormalizeEmits<typeof __VLS_123.emit>;
(__VLS_123.slots!).default;
}
{
const __VLS_125 = __VLS_intrinsicElements["span"];
const __VLS_126 = __VLS_elementAsFunctionalComponent(__VLS_125);
const __VLS_127 = __VLS_126({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_126));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_125, typeof __VLS_127> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_128 = __VLS_pickFunctionalComponentCtx(__VLS_125, __VLS_127)!;
let __VLS_129!: __VLS_NormalizeEmits<typeof __VLS_128.emit>;
(__VLS_128.slots!).default;
}
(__VLS_118.slots!).default;
}
(__VLS_43.slots!).default;
}
{
let __VLS_130!: 'CommentInfo' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.CommentInfo : 'commentInfo' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.commentInfo : 'comment-info' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx['comment-info'] : typeof __VLS_resolvedLocalAndGlobalComponents['CommentInfo'];
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({ ...{}, }));
({} as { CommentInfo: typeof __VLS_130; }).CommentInfo;
({} as { CommentInfo: typeof __VLS_130; }).CommentInfo;
const __VLS_132 = __VLS_131({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_131));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_130, typeof __VLS_132> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_133 = __VLS_pickFunctionalComponentCtx(__VLS_130, __VLS_132)!;
let __VLS_134!: __VLS_NormalizeEmits<typeof __VLS_133.emit>;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["comment-info"];
__VLS_styleScopedClasses["top"];
__VLS_styleScopedClasses["avatar"];
__VLS_styleScopedClasses["name"];
__VLS_styleScopedClasses["mid"];
__VLS_styleScopedClasses["bottom"];
__VLS_styleScopedClasses["dianzan"];
__VLS_styleScopedClasses["huifu"];
__VLS_styleScopedClasses["info"];
}
var __VLS_slots!: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {};
},
});
return (await import('vue')).defineComponent({
setup() {
return {};
},
});
})();
