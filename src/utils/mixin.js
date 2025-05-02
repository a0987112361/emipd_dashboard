import moment from 'moment';
import { parseRequestArray } from './util';

const formatDate = dateStr => moment(dateStr).format('YYYY/MM/DD');

export const getSchoolQuery = (state) => {
  const { country } = state;

  const query = {};

  if (country.length !== 0) query.country = JSON.stringify(country);

  return query;
};

export const getJobQuery = (state) => {
  const { nationality, residence } = state;

  const query = {};

  if (nationality && nationality.length !== 0) query.nationality = JSON.stringify(nationality);
  if (residence && residence.length !== 0) query.residence = JSON.stringify(residence);
  return query;
};

export const getQuery = (state) => {
  const {
    nationality,
    residence,
    certification,
    startFrom,
    startTo,
    endFrom,
    endTo,
    degree,
    sortBy = '',
    isMarked = null,
    job = null,
    jobType,
    stage = null,
    isActivated = null,
    teachingYears = null,
    timezone = null,
    rating = null,
    accountActivate = null,
    country = null,
    school = null,
    accent = null,
    language = null,
    studentAge = null,
    classType,
    workStatus = null,
    status = null,
    duration = null,
  } = state;

  const query = {};

  if (sortBy !== '') query.sortBy = sortBy;

  if (nationality && nationality.length > 0) {
    query.nationality = JSON.stringify(parseRequestArray(nationality));
  }
  if (residence && residence.length > 0) {
    query.residence = JSON.stringify(parseRequestArray(residence));
  }
  if (country && country.length > 0) {
    query.country = JSON.stringify(parseRequestArray(country));
  }
  if (accent && accent.length > 0) {
    query.accent = JSON.stringify(parseRequestArray(accent));
  }
  if (language && language.length > 0) {
    query.language = JSON.stringify(parseRequestArray(language));
  }
  if (studentAge && studentAge.length > 0) {
    query.studentAge = JSON.stringify(parseRequestArray(studentAge));
  }
  if (degree) {
    query.degree = degree.value;
  }
  if (certification && certification.length > 0) {
    query.certification = JSON.stringify(parseRequestArray(certification));
  }
  if (startFrom && startTo) {
    const payload = {
      from: formatDate(startFrom),
      to: formatDate(startTo),
    };
    query.appliedDate = payload;
  }
  if (endFrom && endTo) {
    const payload = {
      from: formatDate(endFrom),
      to: formatDate(endTo),
    };
    query.closedDate = payload;
  }
  if (job !== null) query.jobId = job.value;
  if (stage !== null) query.stageId = stage.value;
  if (school !== null) query.school = school.value;
  if (isActivated !== null) query.isActivated = isActivated.value;
  if (teachingYears !== null) query.teachingYears = teachingYears.value;
  if (timezone !== null) query.tzOffset = parseInt(timezone.value, 10);
  if (rating) {
    query.rating = rating.value;
  }
  if (accountActivate) {
    query.isActivated = accountActivate.value;
  }
  if (jobType) {
    query.jobType = jobType.value;
  }
  if (workStatus) {
    query.workStatus = workStatus.value;
  }

  if (isMarked) {
    query.isMarked = isMarked;
  }

  if (classType) {
    query.classType = classType.value;
  }

  if (status) {
    query.status = status.value;
  }
  if (duration) {
    query.duration = duration.value;
  }

  return query;
};
