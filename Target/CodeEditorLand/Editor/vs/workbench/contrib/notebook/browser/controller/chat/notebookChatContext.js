import{localize as e}from"../../../../../../nls.js";import{MenuId as o}from"../../../../../../platform/actions/common/actions.js";import{RawContextKey as t}from"../../../../../../platform/contextkey/common/contextkey.js";const r=new t("notebookCellChatFocused",!1,e("notebookCellChatFocused","Whether the cell chat editor is focused")),_=new t("notebookChatHasActiveRequest",!1,e("notebookChatHasActiveRequest","Whether the cell chat editor has an active request")),s=new t("notebookChatUserDidEdit",!1,e("notebookChatUserDidEdit","Whether the user did changes ontop of the notebook cell chat")),h=new t("notebookChatOuterFocusPosition","",e("notebookChatOuterFocusPosition","Whether the focus of the notebook editor is above or below the cell chat")),c=o.for("cellChatInput"),l=o.for("cellChatWidget"),T=o.for("cellChatWidget.status"),E=o.for("cellChatWidget.feedback"),i=o.for("cellChatWidget.toolbar"),O=new t("notebookChatAgentRegistered",!1,e("notebookChatAgentRegistered","Whether a chat agent for notebook is registered"));export{r as CTX_NOTEBOOK_CELL_CHAT_FOCUSED,_ as CTX_NOTEBOOK_CHAT_HAS_ACTIVE_REQUEST,O as CTX_NOTEBOOK_CHAT_HAS_AGENT,h as CTX_NOTEBOOK_CHAT_OUTER_FOCUS_POSITION,s as CTX_NOTEBOOK_CHAT_USER_DID_EDIT,c as MENU_CELL_CHAT_INPUT,l as MENU_CELL_CHAT_WIDGET,E as MENU_CELL_CHAT_WIDGET_FEEDBACK,T as MENU_CELL_CHAT_WIDGET_STATUS,i as MENU_CELL_CHAT_WIDGET_TOOLBAR};
