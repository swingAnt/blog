Jest是一个流行的JavaScript测试框架，特别适合用于React项目的单元测试。以下是一个使用Jest进行React项目工程自动化单元测试的基本教程，包括代码配置和演示。

### 1. 安装Jest和相关依赖

首先，你需要在你的React项目中安装Jest和相关依赖。在项目根目录下运行以下命令：

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

这里我们安装了Jest本身，以及`@testing-library/react`（用于渲染React组件和触发事件）和`@testing-library/jest-dom`（提供了一些自定义的Jest匹配器，用于断言DOM节点）。

### 2. 配置Jest

在项目根目录下创建一个名为`jest.config.js`的配置文件，并添加以下内容：

```javascript
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx|mjs)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs)$': 'ts-jest', // 如果你使用TypeScript，需要安装ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
};
```

如果你使用的是TypeScript，你还需要安装`ts-jest`：

```bash
npm install --save-dev ts-jest
```

### 3. 编写测试用例

假设你有一个简单的React组件`Button.js`，你可以在`src`目录下创建一个`__tests__`目录，并在其中创建对应的测试用例文件`Button.test.js`。

```javascript
// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

test('renders a button and when clicked, it increments the count', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<Button onClick={handleClick} />);

  const button = getByRole('button');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

在上面的测试用例中，我们使用了`@testing-library/react`的`render`函数来渲染组件，并用`fireEvent`来模拟点击事件。我们还使用Jest的`jest.fn()`来创建一个模拟函数，用于检查`onClick`回调是否被调用。

### 4. 运行测试

在`package.json`文件中，添加一个运行Jest测试的脚本：

```json
"scripts": {
  "test": "jest"
}
```

然后，你可以通过运行以下命令来执行测试：

```bash
npm test
```

Jest将运行你所有的测试文件，并输出测试结果。如果所有的测试都通过了，你会看到类似以下的输出：

```
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        x.xxx s, estimated x s
Ran all test suites.
```

### 5. 自动化和CI/CD集成

为了自动化测试并在每次代码提交或合并时运行它们，你可以将Jest测试集成到CI/CD系统中，如Jenkins、GitLab CI/CD或Travis CI等。

在CI/CD的配置文件中，你需要添加一个步骤来运行`npm test`命令。这样，每次代码更改时，CI/CD系统都会自动运行测试，并在测试结果不符合预期时通知你。

### 总结

以上就是通过Jest进行React项目工程自动化单元测试的基本教程。通过配置Jest、编写测试用例并集成到CI/CD系统中，你可以确保你的React代码质量，并在代码更改时及时发现问题。