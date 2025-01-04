import React, { useState } from "react";
import { Input, Tag, Typography } from "antd";
import styles from "./CustomTagging.module.css";
import { CustomTaggingProps } from "./CustomTagging.types";
const { Text } = Typography;

const MAX_TAGS = 5; // maximum number of tags allowed
const MAX_CHAR_LENGTH = 10; // maximum characters per tag

const CustomTagging = ({ tags, setTags }: CustomTaggingProps) => {
  const [inputValue, setInputValue] = useState<string>(""); // to track input value
  const [isCharLengthError, setIsCharLengthError] = useState<boolean>(false); // error for character length
  const [isTagLimitError, setIsTagLimitError] = useState<boolean>(false); // error for tag limit

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    // set error for user typing
    setIsCharLengthError(input.length > MAX_CHAR_LENGTH);
    setIsTagLimitError(false);
  };

  const handleInputConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    if (inputValue.length > MAX_CHAR_LENGTH) {
      return;
    }

    const isTagLimitErrored = tags.length >= MAX_TAGS;
    setIsTagLimitError(isTagLimitErrored);
    if (isTagLimitErrored) {
      return;
    }

    // ignore duplicated tag
    if (tags.includes(inputValue)) {
      return;
    }

    setTags([...tags, inputValue]);
    setInputValue(""); // clear the input field after adding
  };

  const handleTagClose = (removedTag: string) => {
    const currentTags = tags.filter((tag) => tag !== removedTag);
    setTags(currentTags);
    setIsTagLimitError(currentTags.length > MAX_TAGS);
  };

  return (
    <div className={styles.customTagContainer}>
      {/* input field to add tags */}
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleInputConfirm} // add tag on pressing Enter
        placeholder="Add custom tags (type and press enter)"
      />

      {/* Inline error messages */}
      {isCharLengthError && (
        <Text type="warning" className={styles.error}>
          Each tag can only be up to {MAX_CHAR_LENGTH} characters.
        </Text>
      )}

      {isTagLimitError && (
        <Text type="warning" className={styles.error}>
          You can only add up to {MAX_TAGS} tags.
        </Text>
      )}

      <div className={styles.taggingListContainer}>
        {/* displaying tags */}
        {tags.map((tag) => (
          <Tag
            className={styles.tag}
            key={tag}
            closable
            onClose={() => handleTagClose(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default CustomTagging;
