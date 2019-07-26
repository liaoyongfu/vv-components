年份选择器。

````jsx harmony
import { useState } from 'react';
import { YearPicker } from 'vv-frontend-components';

const Demo = () => {
    const [value, setValue] = useState();
    
    return (
        <YearPicker 
            value={value} 
            onPanelChange={date => setValue(date)}
            onChange={date => !date && setValue()}
        />
    )
};
<Demo/>
````

注意：更改值使用`onPanelChange`，`onChange`只用作清除值时回调。