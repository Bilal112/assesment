import { light, dark } from '@constants/Colors';
import { useSelector } from 'react-redux';

export default function switchTheme() {
  const themeDark = useSelector(state => state.utils.dark);
  const newColors = useSelector(state => state.utils.themesColors || null);
  const RTL = useSelector(state => state.utils.RTL);

  let textAlign = RTL ? 'right' : 'left'
  let row = RTL ? 'row' : 'left'
  let alignItems = RTL ? 'flex-end' : 'flex-start'
  let flexDirection = RTL ? 'row-reverse' : 'row'

  if (themeDark) {
    if (newColors) dark.primary = newColors.PrimaryDarkColor;
    if (newColors) dark.secondary = newColors.SecondaryDarkColor;
    dark.RTL = RTL
    dark.textAlign = textAlign
    dark.row = row
    dark.alignItems = alignItems
    dark.flexDirection = flexDirection
    return dark;
  } else {
    if (newColors) light.primary = newColors.PrimaryColor;
    if (newColors) light.secondary = newColors.SecondaryColor;
    light.RTL = RTL
    light.textAlign = textAlign
    light.row = row
    light.alignItems = alignItems
    light.flexDirection = flexDirection
    return light;
  }
}
