const selectors = {};

function getRelativeSelector(selectorsHierarchy) {
  return selectorsHierarchy.join(' ');
}

function getSelectorByClassNames() {
  let classes = Object.keys(arguments).map(x => arguments[x]);
  classes = classes.map(x => `[class*= ${x}]`);
  return getRelativeSelector(classes);
}

function _getSelectorByIndex(selector, index) {
  return index ? selector + `:nth-of-type(${index})` : selector;
}

function _getSelectorWithAttribute(selector, attribute, value) {
  return selector + `[${attribute}*="${value}"]`;
}

selectors.BACKGROUND = getSelectorByClassNames('header');
selectors.ALERT_BACKGROUND = '.rodal-mask';
selectors.SAVE_CHANGES_BUTTON = getSelectorByClassNames('key-action-buttons-wrapper', 'save-changes-button');
selectors.ADD_KEY_BUTTON = getSelectorByClassNames('keys-page-container', 'add-button');
selectors.KEY_NAME_INPUT = getSelectorByClassNames('key-main-input', 'auto-suggest', 'bootstrap-typeahead-input-main');
selectors.KEY_DISPLAY_NAME = getSelectorByClassNames('display-name-text');
selectors.KEY_NAME_VALIDATION_ALERT_ICON = getSelectorByClassNames('auto-suggest-wrapper', 'validation-icon-wrapper');
selectors.KEY_VALUE_TYPE_VALIDATION_ALERT_ICON = getSelectorByClassNames('auto-suggest-wrapper', 'validation-icon-wrapper');
selectors.KEY_PATH_SUGGESTIONS = getSelectorByClassNames('dropdown-menu');
selectors.KEY_ACTUAL_PATH = getSelectorByClassNames('actual-path');
selectors.KEY_FOLDER_NAME = getSelectorByClassNames('key-folder-name');
selectors.KEY_LINK = getSelectorByClassNames('key-link');
selectors.DEFAULT_VALUE_INPUT = getRelativeSelector([getSelectorByClassNames('default-value-container'), 'input']);
selectors.DELETE_KEY_BUTTON = getSelectorByClassNames('delete-key-button');
selectors.ADD_RULE_BUTTON = getSelectorByClassNames('add-rule-button');
selectors.ADD_CONDITION_BUTTON = getSelectorByClassNames('add-condition-button');
selectors.RULE_CONDITION = getSelectorByClassNames('condition-wrapper');
selectors.TAB_ITEM_HEADER = getSelectorByClassNames('tab-header');
selectors.RULES_TAB_ITEM = _getSelectorByIndex(selectors.TAB_ITEM_HEADER, 1);
selectors.SOURCE_TAB_ITEM = _getSelectorByIndex(selectors.TAB_ITEM_HEADER, 2);
selectors.KEY_SOURCE_TEXT = getSelectorByClassNames('key-def-json');
selectors.KEY_VIEWER_CONTAINER = getSelectorByClassNames('key-viewer-container');
selectors.KEY_PAGE = getSelectorByClassNames('key-page');
selectors.TAGS_INPUT = getRelativeSelector([getSelectorByClassNames('key-description-and-tags-wrapper', 'tag-input'), 'input']);
selectors.TAG = getSelectorByClassNames('tags-container', 'selected', 'tag');
selectors.TAGS_SUGGESTION = getRelativeSelector([getSelectorByClassNames('tags-suggestion'), 'ul', 'li']);
selectors.KEY_LIST_FILTER = getRelativeSelector([getSelectorByClassNames('search-input-wrapper'), getSelectorByClassNames('search-input')]);
selectors.READONLY_KEY_MESSAGE = getSelectorByClassNames('readonly-key-message');
selectors.KEY_VALUE_TYPE_INPUT = getSelectorByClassNames('key-value-type-selector-wrapper', 'bootstrap-typeahead-input-main');
selectors.NONE_EXISTING_KEY = getSelectorByClassNames('key-page-message');
selectors.ALERT_OK_BUTTON = getSelectorByClassNames('rodal-confirm-btn');
selectors.ALERT_CANCEL_BUTTON = getSelectorByClassNames('rodal-cancel-btn');
selectors.ADD_PARTITION_INPUT = getRelativeSelector([getSelectorByClassNames('partitions-selector-container'), 'input']);
selectors.AUTO_PARTITION_BUTTON = getSelectorByClassNames('auto-partition-btn');
selectors.RESET_PARTITIONS_BUTTON = getSelectorByClassNames('reset-partitions-btn');
selectors.ADD_PARTITION_GROUP_BUTTON = getSelectorByClassNames('new-partition-container', 'add-partition-button');

selectors.folder = (folderName) => {
  return _getSelectorWithAttribute(selectors.KEY_FOLDER_NAME, 'data-folder-name', folderName);
};

selectors.keyLink = (keyName) => {
  return _getSelectorWithAttribute(selectors.KEY_LINK, 'href', `/keys/${keyName}`);
};

selectors.ruleContainer = (ruleIndex) => {
  const ruleContainerSelector = getSelectorByClassNames('conditions-container');
  return ruleIndex ? _getSelectorByIndex(ruleContainerSelector, ruleIndex) : ruleContainerSelector;
};

selectors.conditionValue = (ruleNumber, conditionNumber) => {
  const conditionValueSelector = getRelativeSelector([
    _getSelectorByIndex(selectors.RULE_CONDITION, conditionNumber),
    getSelectorByClassNames('property-value-wrapper'),
    'input',
  ]);

  return getRelativeSelector([selectors.ruleContainer(ruleNumber), conditionValueSelector]);
};

selectors.conditionPropertyName = (ruleNumber, conditionNumber) => {
  const propertyNameSelector =
    getRelativeSelector([
      _getSelectorByIndex(selectors.RULE_CONDITION, conditionNumber),
      getSelectorByClassNames('property-name-wrapper'),
      getSelectorByClassNames('bootstrap-typeahead-input-main'),
    ]);

  return getRelativeSelector([selectors.ruleContainer(ruleNumber), propertyNameSelector]);
};

selectors.conditionDeleteButton = (ruleNumber, conditionNumber) => {
  const propertyNameSelector =
    getRelativeSelector([
      _getSelectorByIndex(selectors.RULE_CONDITION, conditionNumber),
      getSelectorByClassNames('delete-condition-button'),
    ]);

  return getRelativeSelector([selectors.ruleContainer(ruleNumber), propertyNameSelector]);
};

selectors.typeaheadSuggestionByIndex = (suggestionIndex) => {
  const selector =
    getRelativeSelector([
      getSelectorByClassNames('bootstrap-typeahead-menu'),
      _getSelectorByIndex('li', suggestionIndex),
    ]);

  return selector;
};

selectors.ruleValueInput = (ruleIndex, isValueContainsSuggestions) => {
  if (isValueContainsSuggestions)
    return getRelativeSelector([
      selectors.ruleContainer(ruleIndex),
      getSelectorByClassNames('rule-value-container'),
      getSelectorByClassNames('bootstrap-typeahead-input-main')]);

  return getRelativeSelector([
    selectors.ruleContainer(ruleIndex),
    getSelectorByClassNames('rule-value-container'),
    'input']);
};

selectors.partitionDeleteButton = (partitionIndex) => {
  const partitionsSelector = getSelectorByClassNames('partitions-selector-container', 'tag-delete-button');
  return _getSelectorByIndex(partitionsSelector, partitionIndex);
};

selectors.partitionGroup = (groupIndex) => {
  const headerSelector = getSelectorByClassNames('partitions-accordion-container-item');
  return groupIndex ? _getSelectorByIndex(headerSelector, groupIndex) : headerSelector;
};

selectors.partitionGroupDeleteButton = (groupIndex) => {
  return getRelativeSelector([
    selectors.partitionGroup(groupIndex),
    getSelectorByClassNames('partitions-accordion-container-item-title'),
    'button']);
};

selectors.partitionSuggestionByIndex = (suggestionIndex) => {
  return getRelativeSelector([
    getSelectorByClassNames('partitions-selector-container', 'tags-suggestion'),
    _getSelectorByIndex('li', suggestionIndex),
  ]);
};

selectors.newPartitionGroupInput = (partitionIndex) => {
  return getRelativeSelector([
    _getSelectorByIndex(getSelectorByClassNames('new-partition-container', 'new-partition-item-container'), partitionIndex),
    'input'
  ]);
};

export { selectors, getRelativeSelector };