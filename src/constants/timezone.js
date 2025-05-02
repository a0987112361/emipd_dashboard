import timezoneList from 'compact-timezone-list';

for (const timezone of timezoneList) {
  timezone.value = timezone.tzCode;
}

const normalizedTimezoneList = timezoneList.map(
  timezone => ({ ...timezone, value: timezone.tzCode }),
);

export default normalizedTimezoneList;
