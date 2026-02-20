import{$Yf as l}from"../../../../base/common/strings.js";import{localize as e}from"../../../../nls.js";const i=l(e(10496,null)),s=l(e(10497,null)),n=l(e(10498,null)),a=l(e(10499,null)),d=l(e(10500,null)),o=l(e(10501,null)),c=l(e(10502,null)),t=e(10503,null);var p=()=>`
<div id="update-banner" class="issue-reporter-update-banner hidden">
	<span class="update-banner-text" id="update-banner-text">
		<!-- To be dynamically filled -->
	</span>
</div>
<div class="issue-reporter" id="issue-reporter">
	<div id="english" class="input-group hidden">${l(e(10504,null))}</div>

	<div id="review-guidance-help-text" class="input-group">${t}</div>

	<div class="section">
		<div class="input-group">
			<label class="inline-label" for="issue-type">${l(e(10505,null))}</label>
			<select id="issue-type" class="inline-form-control">
				<!-- To be dynamically filled -->
			</select>
		</div>

		<div class="input-group" id="problem-source">
			<label class="inline-label" for="issue-source">${l(e(10506,null))} <span class="required-input">*</span></label>
			<select id="issue-source" class="inline-form-control" required>
				<!-- To be dynamically filled -->
			</select>
			<div id="issue-source-empty-error" class="validation-error hidden" role="alert">${l(e(10507,null))}</div>
			<div id="problem-source-help-text" class="instructions hidden">${l(e(10508,null)).replace("{0}",()=>`<span tabIndex=0 role="button" id="disableExtensions" class="workbenchCommand">${l(e(10509,null))}</span>`)}
			</div>

			<div id="extension-selection">
				<label class="inline-label" for="extension-selector">${l(e(10510,null))} <span class="required-input">*</span></label>
				<select id="extension-selector" class="inline-form-control">
					<!-- To be dynamically filled -->
				</select>
				<div id="extension-selection-validation-error" class="validation-error hidden" role="alert">${l(e(10511,null)).replace("{0}",()=>'<span tabIndex=0 role="button" id="extensionBugsLink" class="workbenchCommand"><!-- To be dynamically filled --></span>')}</div>
				<div id="extension-selection-validation-error-no-url" class="validation-error hidden" role="alert">
					${l(e(10512,null))}
				</div>
			</div>
		</div>

		<div id="issue-title-container" class="input-group">
			<label class="inline-label" for="issue-title">${l(e(10513,null))} <span class="required-input">*</span></label>
			<input id="issue-title" type="text" class="inline-form-control" placeholder="${l(e(10514,null))}" required>
			<div id="issue-title-empty-error" class="validation-error hidden" role="alert">${l(e(10515,null))}</div>
			<div id="issue-title-length-validation-error" class="validation-error hidden" role="alert">${l(e(10516,null))}</div>
			<small id="similar-issues">
				<!-- To be dynamically filled -->
			</small>
		</div>

	</div>

	<div class="input-group description-section">
		<label for="description" id="issue-description-label">
			<!-- To be dynamically filled -->
		</label>
		<div class="instructions" id="issue-description-subtitle">
			<!-- To be dynamically filled -->
		</div>
		<div class="block-info-text">
			<textarea name="description" id="description" placeholder="${l(e(10517,null))}" required></textarea>
		</div>
		<div id="description-empty-error" class="validation-error hidden" role="alert">${l(e(10518,null))}</div>
		<div id="description-short-error" class="validation-error hidden" role="alert">${l(e(10519,null))}</div>
	</div>

	<div class="system-info" id="block-container">
		<div class="block block-extension-data">
			<input class="send-extension-data" aria-label="${o}" type="checkbox" id="includeExtensionData" checked/>
			<label class="extension-caption" id="extension-caption" for="includeExtensionData">
				${o}
				<span id="ext-loading" hidden></span>
				<span class="ext-parens" hidden>(</span><a href="#" class="showInfo" id="extension-id">${l(e(10520,null))}</a><span class="ext-parens" hidden>)</span>
				<a id="extension-data-download">${l(e(10521,null))}</a>
			</label>
			<pre class="block-info" id="extension-data" placeholder="${l(e(10522,null))}" style="white-space: pre-wrap; user-select: text;">
				<!-- To be dynamically filled -->
			</pre>
		</div>

		<div class="block block-system">
			<input class="sendData" aria-label="${i}" type="checkbox" id="includeSystemInfo" checked/>
			<label class="caption" for="includeSystemInfo">
				${i}
				(<a href="#" class="showInfo">${l(e(10523,null))}</a>)
			</label>
			<div class="block-info hidden" style="user-select: text;">
				<!-- To be dynamically filled -->
		</div>
		</div>
		<div class="block block-process">
			<input class="sendData" aria-label="${s}" type="checkbox" id="includeProcessInfo" checked/>
			<label class="caption" for="includeProcessInfo">
				${s}
				(<a href="#" class="showInfo">${l(e(10524,null))}</a>)
			</label>
			<pre class="block-info hidden" style="user-select: text;">
				<code>
				<!-- To be dynamically filled -->
				</code>
			</pre>
		</div>
		<div class="block block-workspace">
			<input class="sendData" aria-label="${n}" type="checkbox" id="includeWorkspaceInfo" checked/>
			<label class="caption" for="includeWorkspaceInfo">
				${n}
				(<a href="#" class="showInfo">${l(e(10525,null))}</a>)
			</label>
			<pre id="systemInfo" class="block-info hidden" style="user-select: text;">
				<code>
				<!-- To be dynamically filled -->
				</code>
			</pre>
		</div>
		<div class="block block-extensions">
			<input class="sendData" aria-label="${a}" type="checkbox" id="includeExtensions" checked/>
			<label class="caption" for="includeExtensions">
				${a}
				(<a href="#" class="showInfo">${l(e(10526,null))}</a>)
			</label>
			<div id="systemInfo" class="block-info hidden" style="user-select: text;">
				<!-- To be dynamically filled -->
			</div>
		</div>
		<div class="block block-experiments">
			<input class="sendData" aria-label="${d}" type="checkbox" id="includeExperiments" checked/>
			<label class="caption" for="includeExperiments">
				${d}
				(<a href="#" class="showInfo">${l(e(10527,null))}</a>)
			</label>
			<pre class="block-info hidden" style="user-select: text;">
				<!-- To be dynamically filled -->
			</pre>
		</div>
		<div class="block block-acknowledgements hidden" id="version-acknowledgements">
			<input class="sendData" aria-label="${c}" type="checkbox" id="includeAcknowledgement"/>
			<label class="caption" for="includeAcknowledgement">
				${c}
			</label>
		</div>
	</div>

</div>`;export{p as default};
