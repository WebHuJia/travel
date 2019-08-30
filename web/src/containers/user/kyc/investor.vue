<template>
  <article id="investorWrap">
    <ul class="nav">
      <li v-for="(s, i) in select.nav" :key="i" @click.stop="nav(s.url)" :class="[s.class, s.url]">{{$t(s.name)}}<i class="fa fa-angle-right"></i></li>
    </ul>
    <div id="investor">
      <div id="record" v-if="onoff.record">
          <article>
            <label>{{$t('kyc.nationality')}}</label>
            <section class="certificateType">
              <span class="cursor" @mouseleave="onoff.show = false" @click.stop="onoff.show = !onoff.show" v-html="showcountry"></span>
              <i class="fa fa-caret-down"  @click.stop="onoff.show = !onoff.show"></i>
              <ul class='intersmsiso height' v-if="onoff.show" @mouseenter="onoff.show = true" @mouseleave="onoff.show = false">
                  <li @click.stop="intersmsisoselect($event)" v-for="(int, index) in intersmsisoarr" :data-country_name="int.country_name" :data-country_name_en="int.country_name_en" :key="index">{{$store.state.LANG === 'zh-cn'?int.country_name : int.country_name_en}}<em>{{int.country_code}}</em></li>
              </ul>
            </section>
          </article>
        <dl class="row">
          <dt>{{$t('investor.investor')}}</dt>
          <dd class="record_radio"><label v-for="(s, i) in select.type" :key="i"><input type="radio" v-model="push.record.investor_type" :value="s.type" name="invest" /><i class="fa fa-dot-circle-o" v-if="push.record.investor_type === s.type"></i><i v-else class="fa fa-circle-thin"></i>{{$t(s.name)}}</label></dd>
          <dd class="row"><label>{{$t('investor.n')}}</label><input type="text" v-model.trim="push.record.name" /><button  class="btnhover" @click.stop="record">{{$t('investor.sac')}}</button></dd>
        </dl>
      </div>
      <div id="basic" v-if="onoff.basic"><!-- 基本信息 -->
        <dl v-if="onoff.personal" class="basic_personal"><!-- 个人基本信息 -->
          <dt style="margin:0;">
            <h3>h1,{{push.record.name}}</h3>
            <span>{{$t('investor.timcwUSlafr')}}</span>
          </dt>
          <dd>
            <label>{{$t('investor.dob')}}</label>
            <createtime @time="birthday" :stateTime="itTime - 100" :defaultTime="push.basic.personal.birthday" :endTime='itTime' :sort="'asc'" :key="'personal'">
            </createtime>
          </dd>
          <dd>
            <accout @accout='accout' :accout='push.basic.personal.mobile' :iscode='push.basic.personal.iso_code' :regisertype="true" :key="'personal'"></accout>
          </dd>
          <dd class="site pd30">
            <label>{{$t('investor.a')}}</label>
            <div><input type="text" v-for="(s, i) in select.site" :key='i' :placeholder="$t(s.name)" v-model.trim="push.basic.personal[s.model]" :disabled="s.disabled" /></div>
            <button @click.stop="basic({type: 'personal'})" class="btnhover">{{$t('investor.sac')}}</button>
          </dd>
        </dl>
        <dl v-if="onoff.company" class="basic_company"><!-- 公司基本信息 -->
          <dt>
            <h4>Hi，{{push.record.name}}{{$t('investor.tco')}}</h4>
            <span>{{$t('investor.timcwUSlafr')}}</span>
          </dt>
            <!-- 公司基本信息区块 -->
          <dd class='pd30 company_details'>
            <h4 class="mt24">{{$t('investor.cp')}}</h4>
            <ul>
              <li>
                <h6>{{$t('investor.cn')}}</h6>
                <input type="text" v-model.trim="push.basic.company.company_name" />
              </li>
              <li class="row">
                <div>
                  <h5 class="type">{{$t('investor.Typeoc')}}</h5>
                  <article class="certificateType">
                    <span @mouseleave="onoff.company_type_onoff = false" @click.stop="onoff.company_type_onoff = !onoff.company_type_onoff"  v-html="push.basic.company.company_type || $t(showText.company_type_onoff)"></span>
                    <i class="fa fa-caret-down" @click.stop="onoff.company_type_onoff = !onoff.company_type_onoff"></i>
                    <ul class='intersmsiso height' v-if="onoff.company_type_onoff" @mouseenter="onoff.company_type_onoff = true" @mouseleave="onoff.company_type_onoff = false">
                        <li @click.stop="push.basic.company.company_type = int.name,onoff.company_type_onoff = false,showText.company_type_onoff = (int.name)" v-for="(int, index) in select.company_type" :key="index">{{$t(int.name)}}</li>
                    </ul>
                  </article>
                </div>
                <div>
                  <h5>{{$t('investor.tc')}}</h5>
                  <input type="text" v-model.trim="push.basic.company.tax_number" />
                </div>
              </li>
              <li>
                <h5 class="pdt10">{{$t('investor.doe')}}</h5>
                <createtime @time="birthday" :stateTime="itTime - 100" :defaultTime="push.basic.company.date_of_establishment" :endTime='itTime' :sort="'asc'" :key="'company'" class="pdb10">
                </createtime>
              </li>
              <li class="row flowwrap">
                <h5 class="shrink">{{$t('investor.f')}}</h5>
                <div>
                  <input type="text" v-model.trim="push.basic.company.establishing_country" />
                </div>
                <div>
                  <input type="text" v-model.trim="push.basic.company.establishing_state" />
                </div>
              </li>
              <li class="site">
                <h5>{{$t('investor.cas')}}</h5>
                <div><input type="text" v-for="(s, i) in select.site" :key='i' :placeholder="$t(s.name)" v-model.trim="push.basic.company[s.model]" :disabled="s.disabled" /></div>
              </li>
            </ul>
            <button @click.stop="basic({type: 'company'})"  class="btnhover">{{$t('investor.save')}}</button>
          </dd>
          <!-- 公司大股东 -->
          <dd>
            <h4>{{$t('investor.ms')}}</h4>
            <span>{{$t('investor.etnoapwomt10otc')}}</span>
            <ul class="shareholder">
              <li v-for="(s, i) in push.basic.companyshareholder.shareholder" :key="i" class="row">
                <div>
                  <h5>{{$t('investor.type')}}</h5>
                  <article class="certificateType">
                    <span @mouseleave="s.onoff = false" @click.stop="s.onoff = !s.onoff" v-html="$t(s.showname)"></span>
                    <i class="fa fa-caret-down" @click.stop="s.onoff = !s.onoff"></i>
                    <ul class='intersmsiso' v-if="s.onoff" @mouseenter="s.onoff = true" @mouseleave="s.onoff = false">
                        <li @click.stop="s.type = int.type ,s.onoff = false,s.showname = int.name" v-for="(int, index) in select.type" :key="index">{{$t(int.name)}}</li>
                    </ul>
                  </article>
                </div>
                <div>
                  <h5>{{$t('investor.n')}}</h5>
                  <input type="text" v-model.trim="s.name" />
                </div>
                <i class="fa fa-trash-o" style="margin-top:50px;" @click.stop="shareholderDelete(i)"></i>
              </li>
            </ul>
            <a href="javascript:;" @click.stop="shareholdernum"><i class="fa fa-plus-circle"></i>{{$t('investor.aams')}}</a>
            <button @click.stop="basic({type: 'CompanyShareholder'})"  class="btnhover">{{$t('investor.save')}}</button>
          </dd>
          <!-- 公司股东所有权 -->
          <dd class="company_shareholder">
            <h4>{{$t('investor.so')}}</h4>
            <span>{{$t('investor.uaedltmssaotcbalfacpacfolloogdoiinacaorls')}}</span>
            <ul class="showUploadFileList" v-if="push.basic.companyshareholderownership.shareholder_ownership.length">
              <li v-for="(s, i) in push.basic.companyshareholderownership.shareholder_ownership" :key="i"><input type="text" :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled /><a href="javascript:;" @click="showdel({obj: 'push.basic.companyshareholderownership.shareholder_ownership', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.so',event: $event, filedisplay: 'push.basic.companyshareholderownership.shareholder_ownership'})">{{$t('investor.ufile')}}</button><p v-if="!push.basic.companyshareholderownership.shareholder_ownership.length">{{$t('investor.nfs')}}</p></div>
            <button @click.stop="basic({type: 'CompanyShareholderOwnership'})"  class="btnhover">{{$t('investor.save')}}</button>
          </dd>
          <!-- {{$t('investor.si')}} -->
          <dd class='pd30'>
            <h4>{{$t('investor.si')}}</h4>
            <ul>
              <li>
                <h6>{{$t('investor.cd')}}</h6>
                <input type="text" v-model.trim="push.basic.companysignerinformation.position" />
              </li>
              <li>
                <h6>{{$t('investor.n')}}</h6>
                <input type="text" v-model.trim="push.basic.companysignerinformation.name" />
              </li>
              <li>
                <h6>{{$t('investor.dob')}}</h6>
                <createtime @time="birthday" :stateTime="itTime - 100" :defaultTime="push.basic.companysignerinformation.birthday" :endTime='itTime' :sort="'asc'" :key="'companysignerinformation'">
                </createtime>
              </li>
              <li>
                <h6>{{$t('kyc.licenseTtype')}}</h6>
                <article class="certificateType">
                  <span @mouseleave="onoff.showselect = false" @click.stop="showselectfun" v-html="push.basic.companysignerinformation.certificate_type == 'id-card' ? ($t('investor.nID')) : push.basic.companysignerinformation.certificate_type == 'passport' ? ($t('investor.p')) : push.basic.companysignerinformation.certificate_type == 'driving-license' ? ($t('investor.dl')) : ''"></span>
                  <i class="fa fa-caret-down" @click.stop="showselectfun"></i>
                  <ul class='intersmsiso' v-if="onoff.showselect" @mouseenter="onoff.showselect = true" @mouseleave="onoff.showselect = false">
                      <li @click.stop="push.basic.companysignerinformation.certificate_type = int.type, onoff.showselect = false" v-for="(int, index) in credential_lists" :key="index">{{$t(int.name)}}</li>
                  </ul>
                </article>
              </li>
              <li>
                <h6>{{$t('investor.dn')}}</h6>
                <input type="text" v-model.trim="push.basic.companysignerinformation.certificate_number" />
              </li>
              <li>
                <h4>{{$t('investor.p')}}</h4>
                <span>{{$t('investor.psisrbofogcpi')}}</span>
                <ul class="showUploadFileList" v-if="push.basic.companysignerinformation.certificate_file.length">
                  <li v-for="(s, i) in push.basic.companysignerinformation.certificate_file" :key="i"><input disabled type="text"  :value="s.split('/')[s.split('/').length-1].split('?')[0]" /><a href="javascript:;" @click="showdel({obj: 'push.basic.companysignerinformation.certificate_file', index: i})">{{$t('investor.delete')}}</a></li>
                </ul>
                <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.id',event: $event, filedisplay: 'push.basic.companysignerinformation.certificate_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.basic.companysignerinformation.certificate_file.length">{{$t('investor.nfs')}}</p></div>
                <a class="flexBlock" href="javascript:;" v-if="!push.basic.companysignerinformation.social_security_number && !push.basic.companysignerinformation.is_social_security_number" @click.stop="push.basic.companysignerinformation.is_social_security_number=true">{{$t('investor.IhtUSssn')}}</a>
              </li>
              <li v-if="push.basic.companysignerinformation.social_security_number || push.basic.companysignerinformation.is_social_security_number">
                <h6>{{$t('investor.ssn')}}</h6>
                <input type="text" v-model.trim="push.basic.companysignerinformation.social_security_number" />
                <a class='flexBlock' href="javascript:;" @click.stop="push.basic.companysignerinformation.is_social_security_number=false,push.basic.companysignerinformation.social_security_number = ''">{{$t('investor.Idthaassn')}}</a>
              </li>
              <li>
                <h6>{{$t('investor.ci')}}</h6>
                <accout @accout='accout' :accout='push.basic.companysignerinformation.mobile' :iscode='push.basic.companysignerinformation.iso_code' :regisertype="true" :key="'companysignerinformation'"></accout>
              </li>
              <li class="site">
                <h6>{{$t('investor.a')}}</h6>
                <div><input type="text" v-for="(s, i) in select.site" :key='i' :placeholder="$t(s.name)" v-model="push.basic.companysignerinformation[s.model]" :disabled="s.disabled" /></div>
              </li>
            </ul>
            <button style="margin:0 0 30px;" @click.stop="basic({type: 'companysignerinformation'})" class="btnhover">{{$t('investor.save')}}</button>
            <button @click.stop="basic({type: 'submit'})" class="btnhover">{{$t('investor.ns')}}</button>
          </dd>
        </dl>
        <dl v-if="onoff.mechanism" class="basic_mechanism"><!--机构基本信息-->
          <dt>
            <h3>Hi，{{push.record.name}}</h3>
            <span>{{$t('investor.timcwUSlafr')}}</span>
          </dt>
          <!-- 机构基本信息 -->
          <dd class="mechanism_details">
            <h4>{{$t('investor.details')}}</h4>
            <span>{{$t('investor.tot')}}</span>
            <div class="row">
              <label v-for="(s, i) in select.mechanism_type" :key="i" class="row flex flexCenter">
                <input type="radio" v-model="push.basic.mechanism.trust_type" :value="s.type" name="mechanism_type" />
                <i class="fa fa-dot-circle-o" v-if="push.basic.mechanism.trust_type === s.type"></i>
                <i v-else class="fa fa-circle-thin"></i>
                {{$t(s.name)}}
              </label>
            </div>
            <h5>{{$t('investor.tc')}}</h5>
            <input type="text" v-model.trim="push.basic.mechanism.tax_number" />
            <span>{{$t('investor.frttisuttIDnotg')}}</span>
            <button @click.stop="basic({type: 'americanMechanismDetails'})" class="btnhover">{{$t('investor.save')}}</button>
          </dd>
          <!-- 机构协议 -->
          <dd class="agreement">
            <h4>{{$t('investor.ta')}}</h4>
            <span>{{$t('investor.uetaIfydtptnwwafilve')}}</span>
            <ul class="showUploadFileList" v-if="push.basic.americanMechanismTrustAgreement.trust_agreement.length">
              <li v-for="(s, i) in push.basic.americanMechanismTrustAgreement.trust_agreement" :key="i"><input  :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.basic.americanMechanismTrustAgreement.trust_agreement', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.ta',event: $event, filedisplay: 'push.basic.americanMechanismTrustAgreement.trust_agreement'})">{{$t('investor.ufile')}}</button><p v-if="!push.basic.americanMechanismTrustAgreement.trust_agreement.length">{{$t('investor.nfs')}}</p></div>
            <button @click.stop="basic({type: 'americanMechanismTrustAgreement'})" class="btnhover">{{$t('investor.save')}}</button>
          </dd>
          <!-- 机构受益人 -->
          <dd class="americanMechanismBeneficiary_beneficiary">
            <h4>{{push.record.name}}{{$t('investor.bo')}}</h4>
            <span>{{$t('investor.etnoapwomt10otc')}}</span>
            <ul class="shareholder">
              <li v-for="(s, i) in push.basic.americanMechanismBeneficiary.beneficiary" :key="i" class='row'>
                <div>
                  <h5>{{$t('investor.type')}}</h5>
                  <article class="certificateType">
                    <span  @mouseleave="s.onoff = false" @click.stop="s.onoff = !s.onoff" v-html="$t(s.showname)"></span>
                    <i  @click.stop="s.onoff = !s.onoff" class="fa fa-caret-down"></i>
                    <ul class='intersmsiso' v-if="s.onoff" @mouseenter="s.onoff = true" @mouseleave="s.onoff = false">
                        <li @click.stop="s.type = int.type, s.onoff = false,s.showname = int.name" v-for="(int, index) in select.type" :key="index">{{$t(int.name)}}</li>
                    </ul>
                  </article>
                </div>
                <div>
                  <h5>{{$t('investor.n')}}</h5>
                  <input type="text" v-model.trim="s.name" />
                </div>
                <i class="fa fa-trash-o" @click.stop="beneficiaryDelete(i)"></i>
              </li>
            </ul>
            <a href="javascript:;" @click.stop="favoreenum"><i class="fa fa-plus-circle"></i>{{$t('investor.aagorb')}}</a>
            <button @click.stop="basic({type: 'americanMechanismBeneficiary'})" class="btnhover">{{$t('investor.save')}}</button>
          </dd>
          <dd class="americanMechanismSignerInformation">
            <h4>{{$t('investor.si')}}</h4>
            <ul>
              <li>
                <h6>{{$t('investor.cd')}}</h6>
                <input type="text" v-model.trim="push.basic.americanMechanismSignerInformation.position" />
              </li>
              <li>
                <h5>{{$t('investor.n')}}</h5>
                <input type="text" v-model.trim="push.basic.americanMechanismSignerInformation.name" />
              </li>
              <li>
                <h5>{{$t('investor.dob')}}</h5>
                <createtime @time="birthday" :stateTime="itTime - 100" :defaultTime="push.basic.americanMechanismSignerInformation.birthday" :endTime='itTime' :sort="'asc'" :key="'americanMechanismSignerInformation'">
                </createtime>
              </li>
              <li>
                <h5>{{$t('kyc.licenseTtype')}}</h5>
                <article class="certificateType">
                  <span  @mouseleave="onoff.showselect = false" @click.stop="showselectfun" v-html="push.basic.americanMechanismSignerInformation.certificate_type == 'id-card' ? ($t('investor.nID')) : push.basic.americanMechanismSignerInformation.certificate_type == 'passport' ? ($t('investor.p')) : push.basic.americanMechanismSignerInformation.certificate_type == 'driving-license' ? ($t('investor.dl')) : ''"></span>
                  <i class="fa fa-caret-down" @click.stop="showselectfun" ></i>
                  <ul class='intersmsiso' v-if="onoff.showselect" @mouseenter="onoff.showselect = true" @mouseleave="onoff.showselect = false">
                      <li @click.stop="push.basic.americanMechanismSignerInformation.certificate_type = int.type,onoff.showselect = false" v-for="(int, index) in credential_lists" :key="index">{{$t(int.name)}}</li>
                  </ul>
                </article>
              </li>
              <li>
                <h5>{{$t('investor.dn')}}</h5>
                <input type="text" v-model.trim="push.basic.americanMechanismSignerInformation.certificate_number" />
              </li>
              <li>
                <h4>{{$t('investor.p')}}</h4>
                <span>{{$t('investor.psisrbofogcpi')}}</span>
                <ul class="showUploadFileList" v-if="push.basic.americanMechanismSignerInformation.certificate_file.length">
                  <li v-for="(s, i) in push.basic.americanMechanismSignerInformation.certificate_file" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.basic.americanMechanismSignerInformation.certificate_file', index: i})">{{$t('investor.delete')}}</a></li>
                </ul>
                <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.id',event: $event, filedisplay: 'push.basic.americanMechanismSignerInformation.certificate_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.basic.americanMechanismSignerInformation.certificate_file.length">{{$t('investor.nfs')}}</p></div>
                <a href="javascript:;" v-if="!push.basic.americanMechanismSignerInformation.is_social_security_number" @click.stop="push.basic.americanMechanismSignerInformation.is_social_security_number=true">{{$t('investor.IhtUSssn')}}</a>
              </li>
              <li v-if="push.basic.americanMechanismSignerInformation.is_social_security_number || push.basic.americanMechanismSignerInformation.social_security_number">
                <h5>{{$t('investor.ssn')}}</h5>
                <input type="text" v-model.trim="push.basic.americanMechanismSignerInformation.social_security_number" />
                <a class="flexBlock" href="javascript:;" @click.stop="push.basic.americanMechanismSignerInformation.is_social_security_number=false">{{$t('investor.Idthaassn')}}</a>
              </li>
              <li>
                <h6>{{$t('investor.ci')}}</h6>
                <accout @accout='accout' :accout='push.basic.americanMechanismSignerInformation.mobile' :iscode='push.basic.americanMechanismSignerInformation.iso_code' :regisertype="true" :key="americanMechanismSignerInformation"></accout>
              </li>
              <li class="site">
                <h5>{{$t('investor.a')}}</h5>
                <div><input type="text" v-for="(s, i) in select.site" :key='i' :placeholder="$t(s.name)" v-model.trim="push.basic.americanMechanismSignerInformation[s.model]" :disabled="s.disabled" /></div>
              </li>
            </ul>
            <button @click.stop="basic({type: 'americanMechanismSignerInformation'})" class="btnhover">{{$t('investor.save')}}</button>
            <button @click.stop="basic({type: 'submit'})" class="btnhover">{{$t('investor.ns')}}</button>
          </dd>
        </dl>
        <!-- 跳转资质认证 -->
      </div>
      <div id="submit" v-if="onoff.submit">
        <dl v-if="onoff.personal" class='personal_submit'><!-- 个人认证 -->
          <dt class="title">
            <h5>{{$t('investor.cbasis')}}</h5>
            <label v-for="(s, i) in select.certification_basis" :key="i"><input type="radio" name="personalAccording" v-model="push.submit.personal.certification_basis" :value="s.type" /><i class="fa fa-dot-circle-o" v-if="push.submit.personal.certification_basis == s.type"></i><i v-else class="fa fa-circle-thin"></i>{{$t(s.name)}}</label>
          </dt>
          <!-- 20-30 -->
          <dd v-if="push.submit.personal.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years'" class="pd30">
            <h5>{{$t('investor.ylyse')}}</h5>
            <s>{{$t('investor.i')}}</s>
            <input type="text" v-model.trim.number="push.submit.personal.one_year_income" />
            <strong>{{$t('investor.ylyse')}}</strong>
            <div v-if="push.submit.personal.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years'">
              <h6>{{$t('investor.file')}}</h6>
              <strong>{{$t('investor.intl90dveragtrapsoralfylia')}}</strong>
              <ul class="showUploadFileList" v-if="push.submit.personal.one_year_income_file.length">
                <li v-for="(s, i) in push.submit.personal.one_year_income_file" :key="i"><input disabled :value="s.split('/')[s.split('/').length-1].split('?')[0]" type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.personal.one_year_income_file', index: i})">{{$t('investor.delete')}}</a></li>
              </ul>
              <div class="row"><button class="uploadBtn mt14" @click.stop="showupload({title: '收入证明文件',event: $event, filedisplay: 'push.submit.personal.one_year_income_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.personal.one_year_income_file.length">{{$t('investor.nfs')}}</p></div>
            </div>
          </dd>
          <dd v-if="push.submit.personal.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years'" class="pd30">
            <h5>{{$t('investor.yiintpty')}}</h5>
            <span>{{$t('investor.i')}}</span>
            <input type="text" v-model.trim.number="push.submit.personal.previous_tax_year" />
            <strong>{{$t('investor.yiintpty')}}</strong>
            <div v-if="push.submit.personal.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years'">
              <h5>{{$t('investor.file')}}</h5>
              <strong>{{$t('investor.intl90dveragtrapsoralfylia')}}</strong>
              <ul class="showUploadFileList" v-if="push.submit.personal.previous_tax_year_file.length">
                <li v-for="(s, i) in push.submit.personal.previous_tax_year_file" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.personal.previous_tax_year_file', index: i})">{{$t('investor.delete')}}</a></li>
              </ul>
              <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.atid',event: $event, filedisplay: 'push.submit.personal.previous_tax_year_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.personal.previous_tax_year_file.length">{{$t('investor.nfs')}}</p></div>
            </div>
            <label class="check mt24" ref="push.submit.personal.least">
              <i class="fa fa-dot-circle-o" v-if="push.submit.personal.least"></i><i v-else class="fa fa-circle-thin"></i>
              <input type="checkbox" v-model="push.submit.personal.least" /><span>{{$t('investor.Ietomatl$200,000yy($300,000wms)')}}</span>
            </label>
            <button @click.stop="basic({type: 'americanPersonalAssets'})"  class="btnhover">{{$t('investor.sac')}}</button>
          </dd>
          <!-- 一百万 -->
          <dd v-if="push.submit.personal.certification_basis == 'Net worth over $1M'" class='pd30'>
            <h5>{{$t('investor.ya')}}</h5>
            <s>{{$t('investor.ynw')}}</s>
            <input type="text" v-model.trim.number="push.submit.personal.net_assets" />
            <strong>{{$t('investor.ynwisaa(eypr)mal')}}</strong>
          </dd>
          <dd v-if="push.submit.personal.certification_basis == 'Net worth over $1M'">
            <h5>{{$t('investor.poya')}}</h5>
            <label>{{$t('investor.hdoywtopya?')}}</label>
            <ol class="personaluploadfile">
              <!-- <li><input type="radio">在线财务账户余额</li> -->
              <li>
                <input type="radio" name="personaluploadfile" />
                <i class="fa fa-dot-circle-o" ></i>{{$t('investor.ufile')}}
              </li>
              <!-- <li><input type="radio">向我的律师、注册会计师、投资顾问或经纪人发出核实请求。</li> -->
            </ol>
            <div>
              <h5>{{$t('investor.afile')}}</h5>
              <label>{{$t('investor.uacfafi')}}</label>
              <ul class="showUploadFileList" v-if="push.submit.personal.proof_of_assets.length">
                <li v-for="(s, i) in push.submit.personal.proof_of_assets" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.personal.proof_of_assets', index: i})">{{$t('investor.delete')}}</a></li>
              </ul>
              <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.afile',event: $event, filedisplay: 'push.submit.personal.proof_of_assets'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.personal.proof_of_assets.length">{{$t('investor.nfs')}}</p></div>
            </div>
          </dd>
          <dd v-if="push.submit.personal.certification_basis == 'Net worth over $1M'">
            <h5>{{$t('investor.yd')}}</h5>
            <label>{{$t('investor.doyhavetusssn?')}}</label>
            <ol>
              <li v-for="(s, i) in select.soical" :key="i"><label class="row" ><input type="radio" name="personalAccording" v-model="push.submit.personal.is_social_security_number" :value="s.booble" /><i class="fa fa-dot-circle-o" v-if="push.submit.personal.is_social_security_number == s.booble"></i><i v-else class="fa fa-circle-thin"></i>{{$t(s.name)}}</label></li>
              <li class='mt14'><input type="text" style="margin-bottom:30px;" v-if="push.submit.personal.is_social_security_number" v-model.trim="push.submit.personal.social_security_number" /></li>
            </ol>
            <div v-if="!push.submit.personal.is_social_security_number">
              <h5>{{$t('investor.ldr')}}</h5>
              <label>{{$t('investor.uacfafi')}}</label>
              <ul class="showUploadFileList" v-if="push.submit.personal.debt_report.length">
                <li v-for="(s, i) in push.submit.personal.debt_report" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" type="text" disabled /><a href="javascript:;" @click="showdel({obj: 'push.submit.personal.debt_report', index: i})">{{$t('investor.delete')}}</a></li>
              </ul>
              <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.coi',event: $event, filedisplay: 'push.submit.personal.debt_report'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.personal.debt_report.length">{{$t('investor.nfs')}}</p></div>
            </div>
          </dd>
          <dd v-if="push.submit.personal.certification_basis == 'Net worth over $1M'" class='pd30'>
            <div>
              <h5>{{$t('investor.adcr')}}</h5>
              <label class="check authorized_credit_report" for="authorized_credit_report" ref="push.submit.personal.authorized_credit_report">
                <i class="fa fa-dot-circle-o" v-if="push.submit.personal.authorized_credit_report"></i><i v-else class="fa fa-circle-thin"></i>
                <input type="checkbox" id="authorized_credit_report" v-model.Number="push.submit.personal.authorized_credit_report" /><span>{{$t('investor.Ihacaiainwtoomcrwwcamod')}}</span></label>
            </div>
            <button  @click.stop="basic({type: 'americanPersonalAssets'})"  class="btnhover">{{$t('investor.sac')}}</button>
          </dd>
        </dl>
        <dl v-if="onoff.company" class="company_submit"><!-- 公司认证-->
          <dt class="title">
            <h5>{{$t('investor.cbasis')}}</h5>
            <label v-for="(s, i) in select.company" :key="i"><input type="radio" name="personalAccording" v-model="push.submit.company.certification_basis" :value="s.type" /><i class="fa fa-dot-circle-o" v-if="push.submit.company.certification_basis === s.type"></i><i v-if="push.submit.company.certification_basis !== s.type" class="fa fa-circle-thin"></i>{{$t(s.name)}}</label>
          </dt>
          <!-- {{$t('investor.ca')}} -->
          <dd v-if="push.submit.company.certification_basis === 'Company has over $5,000,000 in assets'"  class="AssetFiles">
            <h5>{{$t('investor.ca')}}</h5>
            <label style="margin-bottom:14px;" ref="push.submit.company.company_assets_label">{{$t('investor.mbeatl$5,000,000')}}</label>
            <input type="text" v-model.trim.number="push.submit.company.company_assets" ref="push.submit.company.company_assets" @focus='borderColor($event)' />
            <h5 style="margin-bottom:12px;">{{$t('investor.afile')}}</h5>
            <ol>
              <li>{{$t('investor.Agfstnaum(fmDorADV)afspbyanaflfalorasna')}}</li>
              <li>{{$t('investor.ycaabonypuasfatedceorwuamutwortwspktoets')}}
                <i class="fa fa-exclamation-circle" :title="`
                    ${$t('investor.inotomtarftpayhm')}
                    ${$t('investor.1uasfatedceorwtstvotssh&vatmt$1m')}
                    ${$t('investor.sssidaelitoas(fenortnotie)or')}
                    ${$t('investor.2uamtuSyworipktoeysapyhaveawmt$1m')}
                    ${$t('investor.inbcantydds(feacroryasl)toq')}`">
                </i>
              </li>
            </ol>
            <ul class="showUploadFileList" v-if="push.submit.company.asset_file.length">
              <li v-for="(s, i) in push.submit.company.asset_file" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.company.asset_file', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.afile',event: $event, filedisplay: 'push.submit.company.asset_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.company.asset_file.length">{{$t('investor.nfs')}}</p></div>
          </dd>
          <!-- {{$t('investor.ce')}} -->
          <dd  v-if="push.submit.company.certification_basis === 'All equity owners are accredited'"  key="All equity owners are accredited">
            <h4>{{$t('investor.ce')}}</h4>
            <span>{{$t('investor.uasfalaoribsassore')}}</span>
            <ul class="showUploadFileList" v-if="push.submit.company.certified_evidence.length" key="All equity owners are accredited">
              <li v-for="(s, i) in push.submit.company.certified_evidence" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.company.certified_evidence', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.srd',event: $event, filedisplay: 'push.submit.company.certified_evidence'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.company.certified_evidence.length">{{$t('investor.nfs')}}</p></div>
          </dd>
          <!-- {{$t('investor.ce')}} -->
          <dd v-if="push.submit.company.certification_basis === 'All equity owners are qualified purchasers'"  key="All equity owners are qualified purchasers">
            <h4>{{$t('investor.ce')}}</h4>
            <span>{{$t('investor.uasfalaoribsassore')}}</span>
            <ul class="showUploadFileList" v-if="push.submit.company.certified_evidence.length" key="All equity owners are qualified purchasers">
              <li v-for="(s, i) in push.submit.company.certified_evidence" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.company.certified_evidence', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.atoaree',event: $event, filedisplay: 'push.submit.company.certified_evidence'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.company.certified_evidence.length">{{$t('investor.nfs')}}</p></div>
          </dd>
          <dd class="pd30"><button style="margin-top:40px;" @click.stop="basic({type: 'americanCompanyAssets'})" class="btnhover">{{$t('investor.sac')}}</button></dd>

        </dl>
        <dl v-if="onoff.mechanism" class="mechanism_submit"><!-- 机构认证-->
          <dt v-if="push.basic.mechanism.trust_type == 'Revocable'" class="title">
            <h5>{{$t('investor.cbasis')}}</h5>
            <label v-for="(s, i) in select.mechanism" :key="i"><input type="radio" name="personalAccording" v-model="push.submit.mechanism.certification_basis" :value="s.type" /><i class="fa fa-dot-circle-o" v-if="push.submit.mechanism.certification_basis === s.type"></i><i v-else class="fa fa-circle-thin"></i>{{$t(s.name)}}</label>
          </dt>
          <dd class="mechanism_annual" v-if="push.submit.mechanism.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years' && push.basic.mechanism.trust_type == 'Revocable'">
            <h4>{{$t('investor.ylyse')}}</h4>
            <label>{{$t('investor.i')}}</label>
            <input type="text" v-model.trim.number="push.submit.mechanism.one_year_income" />
            <strong>{{$t('investor.icotly')}}</strong>
            <h5>{{$t('investor.sd')}}</h5>
            <b>{{$t('investor.intl90dveragtrapsoralfylia')}}</b>
            <ul class="showUploadFileList" v-if="push.submit.mechanism.one_year_income_file.length">
              <li v-for="(s, i) in push.submit.mechanism.one_year_income_file" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.mechanism.one_year_income_file', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.icotly',event: $event, filedisplay: 'push.submit.mechanism.one_year_income_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.mechanism.one_year_income_file.length">{{$t('investor.nfs')}}</p></div>
          </dd>
          <dd class="mechanism_ratepaying" v-if="push.submit.mechanism.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years' && push.basic.mechanism.trust_type == 'Revocable'">
            <h5>{{$t('investor.popty')}}</h5>
            <span>{{$t('investor.i')}}</span>
            <input type="text" v-model.trim.number="push.submit.mechanism.previous_tax_year"/>
            <strong>{{$t('investor.popty')}}</strong>
            <h5>{{$t('investor.file')}}</h5>
            <b>{{$t('investor.intl90dveragtrapsoralfylia')}}</b>
            <ul class="showUploadFileList" v-if="push.submit.mechanism.previous_tax_year_file.length">
              <li v-for="(s, i) in push.submit.mechanism.previous_tax_year_file" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.mechanism.previous_tax_year_file', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.popty',event: $event, filedisplay: 'push.submit.mechanism.previous_tax_year_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.mechanism.previous_tax_year_file.length">{{$t('investor.nfs')}}</p></div>
            <label class="check" ref="push.submit.mechanism.least">
              <i class="fa fa-dot-circle-o" v-if="push.submit.mechanism.least"></i><i v-else class="fa fa-circle-thin"></i>
              <input type="checkbox" v-model="push.submit.mechanism.least" />{{$t('investor.Ietomatl$200,000yy($300,000wms)')}}
            </label>
          </dd>
          <!-- 一百万 -->
          <dd class="mechanism_assets" v-if="push.submit.mechanism.certification_basis == 'Net worth over $1M' && push.basic.mechanism.trust_type == 'Revocable'">
            <h5>{{$t('investor.ya')}}</h5>
            <label>{{$t('investor.ynw')}}</label>
            <input type="text" v-model.trim.number="push.submit.mechanism.net_assets" />
            <strong>{{$t('investor.ynwisaa(eypr)mal')}}</strong>
          </dd>
          <dd v-if="push.submit.mechanism.certification_basis == 'Net worth over $1M' && push.basic.mechanism.trust_type == 'Revocable'">
            <h5>{{$t('investor.poya')}}</h5>
            <!-- <label>{{$t('investor.hdoywtopya?')}}</label>
            <ol>
              <li><input type="radio">在线财务账户余额</li>
              <li><i class="fa fa-dot-circle-o"></i><input type="radio">{{$t('investor.ufile')}}</li>
              <li><input type="radio">向我的律师、注册会计师、投资顾问或经纪人发出核实请求。</li>
            </ol> -->
            <div>
              <!-- <h5>{{$t('investor.afile')}}</h5> -->
              <label>{{$t('investor.uacfafi')}}</label>
              <ul class="showUploadFileList" v-if="push.submit.mechanism.proof_of_assets.length">
                <li v-for="(s, i) in push.submit.mechanism.proof_of_assets" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.mechanism.proof_of_assets', index: i})">{{$t('investor.delete')}}</a></li>
              </ul>
              <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.afile',event: $event, filedisplay: 'push.submit.mechanism.proof_of_assets'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.mechanism.proof_of_assets.length">{{$t('investor.nfs')}}</p></div>
            </div>
          </dd>
          <dd v-if="push.submit.mechanism.certification_basis == 'Net worth over $1M' && push.basic.mechanism.trust_type == 'Revocable'" class="yourassets">
            <h5>{{$t('investor.yd')}}</h5>
            <strong>{{$t('investor.doyhavetusssn?')}}</strong>
            <ol>
              <li v-for="(s, i) in select.soical" :key="i"><label><input type="radio" name="personalAccording" v-model="push.submit.mechanism.is_social_security_number" :value="s.booble" /><i class="fa fa-dot-circle-o" v-if="push.submit.mechanism.is_social_security_number == s.booble"></i><i v-else class="fa fa-circle-thin"></i>{{$t(s.name)}}</label></li>
              <li v-if="push.submit.mechanism.is_social_security_number"><input type="text" v-model.trim="push.submit.mechanism.social_security_number" /></li>
            </ol>
            <div v-if="!push.submit.mechanism.is_social_security_number">
              <h5>{{$t('investor.ldr')}}</h5>
              <label>{{$t('investor.uacfafi')}}</label>
              <ul class="showUploadFileList" v-if="push.submit.mechanism.debt_report.length">
                <li v-for="(s, i) in push.submit.mechanism.debt_report" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.mechanism.debt_report', index: i})">{{$t('investor.delete')}}</a></li>
              </ul>
              <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.coi',event: $event, filedisplay: 'push.submit.mechanism.debt_report'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.mechanism.debt_report.length">{{$t('investor.nfs')}}</p></div>
            </div>
            <h5>{{$t('investor.adcr')}}</h5>
            <label class="check" ref="push.submit.mechanism.authorized_credit_report">
              <i class="fa fa-dot-circle-o" v-if="push.submit.mechanism.authorized_credit_report"></i><i v-else class="fa fa-circle-thin"></i>
              <input type="checkbox" v-model.Number="push.submit.mechanism.authorized_credit_report" />
              <p><span>{{$t('investor.Ihacaiainwtoomcrwwcamod')}}</span></p>
            </label>
          </dd>
          <dd class="mechanism_cloce" v-if="push.basic.mechanism.trust_type == 'Revocable' && push.basic.mechanism.trust_type == 'Revocable'">
            <h5>{{push.record.name}}{{$t('investor.r')}}</h5>
            <strong>{{$t('investor.rfile')}}</strong>
            <span>{{$t('investor.uytaordysdtrogats')}}</span>
            <ul class="showUploadFileList" v-if="push.submit.mechanism.revocable_file.length">
              <li v-for="(s, i) in push.submit.mechanism.revocable_file" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text"/><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.mechanism.revocable_file', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.rfile',event: $event, filedisplay: 'push.submit.mechanism.revocable_file'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.mechanism.revocable_file.length">{{$t('investor.nfs')}}</p></div>
            <button  @click.stop="basic({type: 'americanMechanismAssets'})" class="btnhover">{{$t('common.submit')}}</button>
          </dd>
          <!-- 不可撤销 -->
          <dd v-if="push.basic.mechanism.trust_type == 'Irrevocable'" class="notclose">
            <h5>{{$t('investor.tfund')}}</h5>
            <label>{{$t('investor.mbeatl$5,000,000')}}</label>
            <input type="text" v-model.trim.number="push.submit.irrevocablemechanism.assets"/>
          </dd>
          <dd v-if="push.basic.mechanism.trust_type == 'Irrevocable'" class="notclose">
            <h5 style="margin-top:24px;">{{$t('investor.afile')}}</h5>
            <ul>
              <li>{{$t('investor.uasfafiaaalfylaibinw')}}</li>
              <li>{{$t('investor.ycaabonypuasfatedceorwuamutwortwspktoets')}}</li>
            </ul>
            <ul class="showUploadFileList" v-if="push.submit.irrevocablemechanism.proof_of_assets.length">
              <li v-for="(s, i) in push.submit.irrevocablemechanism.proof_of_assets" :key="i"><input :value="s.split('/')[s.split('/').length-1].split('?')[0]" disabled type="text" /><a href="javascript:;" @click.stop="showdel({obj: 'push.submit.irrevocablemechanism.proof_of_assets', index: i})">{{$t('investor.delete')}}</a></li>
            </ul>
            <div class="row"><button class="uploadBtn" @click.stop="showupload({title: 'investor.rfile',event: $event, filedisplay: 'push.submit.irrevocablemechanism.proof_of_assets'})">{{$t('investor.ufile')}}</button><p v-if="!push.submit.irrevocablemechanism.proof_of_assets.length">{{$t('investor.nfs')}}</p></div>
            <button @click.stop="basic({type: 'americanMechanismIrrevocable'})" class="btnhover">{{$t('common.submit')}}</button>
          </dd>
        </dl>
      </div>
      <div id="notus" v-if="onoff.notus">
        <p>{{$t('investor.dyhtfc')}}</p>
        <ol>
          <li v-for="(s, i) in notUsInfoList" :key="i" class="box">
            <p class="title" @click.stop="s.onoff = !s.onoff"><span v-html="s.title"></span><i class="fa fa-angle-down" v-if="s.onoff"></i><i v-if="!s.onoff" class="fa fa-angle-right"></i></p>
            <div v-html="s.content" :class="s.onoff ? s.class : ''">
            </div>
          </li>
        </ol>
        <button @click.stop="repulse" class="repulse">{{$t('investor.no')}}</button>
        <button @click.stop="notusPost">{{$t('investor.yes')}}</button>
      </div>
      <div id="complete" v-if="onoff.complete">
          <h4>Hi,{{push.record.name}}</h4>
          <span>{{$t('investor.yhsatipwpf1-3wd')}}</span>
          <button @click="backKyc">{{$t('investor.return')}}</button>
      </div>
    </div>
    <div v-if="onoff.delonoff" class='delbox pop' >
      <i @click.stop="onoff.delonoff = false" class="fa fa-times" aria-hidden="true"></i>
      <p >{{$t('mentiontoken.dele')}}</p>
      <button @click.stop="delUploadFile()">{{$t('mentiontoken.ok')}}</button>
    </div>
    <div v-if="onoff.nextonoff" class='nextbox pop' >
      <i @click.stop="onoff.delonoff = false" class="fa fa-times" aria-hidden="true"></i>
      <p >{{$t('investor.w')}}</p>
      <button @click.stop="delUploadFile()">{{$t('mentiontoken.ok')}}</button>
    </div>
    <upload :title="poptitle" :showpop="showpop" @uploadImg="uploadUrl" @hidepop="closeupload"></upload>
  </article>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('kyc.qualified') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  },
  data () {
    return {
      showpop: false,
      notUsInfoList: {},
      delobj: '',
      delobjindex : 0,
      investoreType: '',
      pushsubmitpersonalis_social_security_number: '',
      FileArr: [],
      onoff: {
        notus: false,
        show: false,
        social: false,
        basic: false,
        submit: false,
        personal: false,
        company: false,
        mechanism: false,
        record: true,
        showselect: false,
        company_type_onoff: false,
        typeonoff: false,
        delonoff: false,
        complete: false,
        nextonoff: false
      },
      showText: {
        company_type_onoff: '',
        company_certificate_type: '',
        company_typeonoff: '',
        Mechanism_typeonoff: '',
        Mechanism_certificate_type: ''
      },
      showcredential_type_value: '',
      credential_lists:  [{name: 'investor.nID', type: 'id-card'},{name: 'investor.p',type: 'passport'}, {name: 'investor.dl',type: 'driving-license'}],
      uploadFileUrlArr: [],
      uploadSHowList: '',
      select: {
        certification_basis: [{name: 'investor.ioieotl2y', type: 'Income of $200K ($300K with spouse) in each of the last 2 years'}, {name: 'investor.nwo1m',type: 'Net worth over $1M'}],//个人
        mechanism: [{name: 'investor.ioieotl2y', type: 'Income of $200K ($300K with spouse) in each of the last 2 years'}, {name: 'investor.nwo1m',type: 'Net worth over $1M'}],//信托机构
        mechanism_type: [{name: 'investor.r', type: 'Revocable'},{name: 'investor.irr',type: 'Irrevocable'}],
        company: [{name: 'investor.tchmt5mia', type: 'Company has over $5,000,000 in assets'}, {name: 'investor.asar',type: 'All equity owners are accredited'}, {name: 'investor.aoaep',type: 'All equity owners are qualified purchasers'}],//公司
        company_type: [{name: 'Corporation'}, {name: 'LLC'},{name: 'S-Corporation'},{name: 'Partnership'},{name: 'Estate'},{name: 'LLP'},{name: 'Exempt organization'},{name: 'Foreign entity'}],
        type: [{name: 'investor.personal', type: 'personal'},{name: 'investor.company', type: 'company'},{name: 'investor.mechanism', type: 'mechanism'}],
        site: [{name: 'investor.Thestreet', model: 'street', disabled: false},{name: 'investor.city', model: 'city', disabled: false},{name: 'investor.countries', model: 'country', disabled: true},{name: 'investor.State/ground', model: 'state', disabled: false},{name: 'investor.Postno', model: 'zip_code', disabled: false}],
        soical: [{name: 'investor.IhtUSssn', booble: true},{name: 'investor.Idthaassn',en: 'not',booble: false}],
        nav: [{name: 'investor.rj', url: 'record', class: 'act'},{name: 'investor.bi',url: 'basic',class: ''},{name: 'investor.sa',url: 'submit',class: ''},{name: 'investor.c',url: 'complete',class: ''}]
      },
      itTime: new Date().getFullYear(),
      intersmsisoarr: [],
      showcountry: '',
      push: {
        record: {
          country: '',
          name: '',
          investor_type: ''
        },
        basic:{
          personal: { // 个人基本信息
            birthday: new Date(),
            iso_code: '',
            mobile: '',
            country: "United States",
            city: '',
            street: '',
            state: '',
            zip_code: ''
          },
          company: { // 公司基本信息
            company_name: '',
            company_type: '',
            tax_number: '',
            date_of_establishment: '',
            establishing_country: '',
            establishing_state: '',
            country: 'United States',
            street: '',
            city: '',
            state: '',
            zip_code: ''
          },
          companyshareholder: { //投资公司大股东
            shareholder: [{name: '', type: '',onoff: false, showname: ''}]
          },
          americanMechanismBeneficiary: {//机构受益人
            beneficiary: [{name: '', type: '',onoff: false, showname: ''}]
          },
          americanMechanismTrustAgreement: {//机构信托协议
            trust_agreement: []
          },
          companysignerinformation: {//公司{{$t('investor.si')}}
            position: '',
            name: '',
            birthday: '',
            certificate_type: '',
            certificate_number: '',
            certificate_file: [],
            iso_code: '',
            mobile: '',
            country: 'United States',
            city: '',
            street: '',
            state: '',
            zip_code: '',
            social_security_number: '',
            is_social_security_number: false
          },
          americanMechanismSignerInformation: {//机构{{$t('investor.si')}}
            position: '',
            name: '',
            birthday: '',
            certificate_type: '',
            certificate_number: '',
            certificate_file: [],
            iso_code: '',
            mobile: '',
            country: 'United States',
            city: '',
            street: '',
            state: '',
            zip_code: '',
            social_security_number: '',
            is_social_security_number: false
          },
          companyshareholderownership: { //投资公司股东所有权
            shareholder_ownership: []
          },
          mechanism: { // 机构基本信息 机构详情
            trust_type: 'Revocable',
            tax_number: ''
          }
        },
        submit: { // 资产认证
          personal: { // 个人资产认证
            certification_basis: "Income of $200K ($300K with spouse) in each of the last 2 years",
            one_year_income: '',
            one_year_income_file: [],
            previous_tax_year: '',
            previous_tax_year_file: [],
            least: false,
            net_assets: '',
            proof_of_assets: [],
            is_social_security_number: false,
            social_security_number: '',
            debt_report: [],
            authorized_credit_report: ''
          },
          company: { // {{$t('investor.ca')}}认证
            certification_basis: "Company has over $5,000,000 in assets",
            company_assets: '',
            asset_file: [],
            certified_evidence: []
          },
          mechanism: { // 机构资产认证
            certification_basis: "Income of $200K ($300K with spouse) in each of the last 2 years",
            one_year_income: '',
            one_year_income_file: [],
            previous_tax_year: '',
            previous_tax_year_file: [],
            least: false,
            net_assets: '',
            proof_of_assets: [],
            is_social_security_number: true,
            social_security_number: '',
            debt_report: [],
            authorized_credit_report: '',
            revocable_file: []
          },
          irrevocablemechanism: {//不可撤销机构资产认证
            assets: '',
            proof_of_assets: []
          }
        }
      }
    }
  },
  created () {
    this.http()
  },
  methods: {
    http () {
      this.intersmsisoarr = []
      this.axios.axiosget({ // 请求国际码
        url: '/user/original/intersmsiso'
      }).then((ret) => {
        ret.data.data.forEach((obj, index) => {
          obj.iso_code == 86 ? '' : this.intersmsisoarr.push(obj)
        })

        if (localStorage.getItem('lang') === 'zh-cn') {
          this.showcountry = `${this.intersmsisoarr[0].country_name} - ${this.intersmsisoarr[0].country_code}`
        } else if (localStorage.getItem('lang') === 'en-us') {
          this.showcountry = `${this.intersmsisoarr[0].country_name_en} - ${this.intersmsisoarr[0].country_code}`
        }
        // var pushdata = {
        //   country_code: "CN",
        //   country_name: "中国",
        //   country_name_en: "China"
        // }
        // if (localStorage.getItem('lang') === 'zh-cn') {
        //   this.intersmsisoarr.unshift(pushdata)
        //   this.showcountry = `中国 - <em> CN </em>`
        //   this.push.record.country = 'China'
        // } else if (localStorage.getItem('lang') === 'en-us') {
        //   this.showcountry = `Andorra - <em> AD </em>`
        //   this.push.record.country = 'Andorra'
        // }
        this.axios.axiosget({
          url: `/user/investors/myInvestorsDetails`,
          headers: {
            'x-device-language': this.$store.state.LANG,
            'XX-Token': localStorage.getItem('token'),
            'XX-Device-Type': this.$store.state.users.device_type,
          }
        }).then((rett) => {
          if (!rett.data.data.country) {
            this.push.record.country = this.intersmsisoarr[0].country_name_en
          }
          this.intersmsisoarr.map((obj,index) => {
            if (obj.country_name_en === rett.data.data.country) {
              if (localStorage.getItem('lang') === 'zh-cn') {
                  this.showcountry = `${obj.country_name} - <em> ${obj.country_code} </em>`
              } else if (localStorage.getItem('lang') === 'en-us') {
                  this.showcountry = `${obj.country_name_en} - <em> ${obj.country_code} </em>`
              }
            }
          })
          this.investoreType = rett.data.data.investor_type
          this.push.record.name = rett.data.data.name
          rett.data.data.country ? this.push.record.country = rett.data.data.country : ''
          this.push.record.investor_type = rett.data.data.investor_type
          if (rett.data.data.data) {
            this.onoff.personal = false
            this.onoff.company = false
            this.onoff.mechanism = false
            if (rett.data.data.investor_type == 'company') {
              this.onoff.company = true
              if (rett.data.data.data.company_information) {
                Object.assign(this.push.basic.company, rett.data.data.data.company_information)
              }
              if (rett.data.data.data.signer_information) {
                Object.assign(this.push.basic.companysignerinformation, rett.data.data.data.signer_information)
              }
              if (rett.data.data.data.shareholder_ownership) {
                Object.assign(this.push.basic.companyshareholderownership.shareholder_ownership, rett.data.data.data.shareholder_ownership)
              }
              if (rett.data.data.data.shareholder) {
                Object.assign(this.push.basic.companyshareholder.shareholder, rett.data.data.data.shareholder)
              }
              if (rett.data.data.data.proof_of_income) {
                Object.assign(this.push.submit.company, rett.data.data.data.proof_of_income)
              }
              if (rett.data.data.data.shareholder) {
                this.push.basic.companyshareholder.shareholder.map((obj,index) => {
                  this.$set(obj,'onoff',false)
                  switch (obj.type) {
                    case 'personal':
                    this.$set(obj, 'showname',('investor.personal'))
                    break
                    case 'company':
                    this.$set(obj, 'showname',('investor.company'))
                    break;
                    case 'mechanism':
                    this.$set(obj, 'showname',('investor.mechanism'))
                    break
                  }
                })
              }

            } else if (rett.data.data.investor_type == 'mechanism') {
              this.onoff.mechanism = true
              if (rett.data.data.data.details) {
                Object.assign(this.push.basic.mechanism,rett.data.data.data.details)
              }
              if (rett.data.data.data.beneficiary) {
                Object.assign(this.push.basic.americanMechanismBeneficiary.beneficiary,rett.data.data.data.beneficiary)
              }
              if (rett.data.data.data.signer_information) {
                Object.assign(this.push.basic.americanMechanismSignerInformation,rett.data.data.data.signer_information)
              }
              if (rett.data.data.data.trust_agreement) {
                Object.assign(this.push.basic.americanMechanismTrustAgreement.trust_agreement,rett.data.data.data.trust_agreement)
              }
              if (rett.data.data.data.proof_of_income) {
                if (rett.data.data.data.details.trust_type == 'Irrevocable') {
                  Object.assign(this.push.submit.irrevocablemechanism,rett.data.data.data.proof_of_income)
                  } else if (rett.data.data.data.details.trust_type == 'Revocable') {
                  Object.assign(this.push.submit.mechanism,rett.data.data.data.proof_of_income)
                }
              }
            } else if (rett.data.data.investor_type == 'personal') {
              this.onoff.personal = true
              if (rett.data.data.data.information) {
                Object.assign(this.push.basic.personal,rett.data.data.data.information)
              }
              if (rett.data.data.data.mobile) {
                Object.assign(this.accoutNum,rett.data.data.data.mobile)
              }
              if (rett.data.data.data.iso_code) {
                Object.assign(this.isocode,rett.data.data.data.iso_code)
              }
              if (rett.data.data.data.proof_of_income) {
                Object.assign(this.push.submit.personal,rett.data.data.data.proof_of_income)
              }
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
          console.log(error)
        })
    },
    intersmsisoselect (event) { // 国际码
      this.push.record.country = event.currentTarget.dataset.country_name_en
      if (localStorage.getItem('lang') === 'zh-cn') {
          this.showcountry = `${event.currentTarget.dataset.country_name} - <em> ${event.currentTarget.children[0].innerHTML} </em>`
      } else if (localStorage.getItem('lang') === 'en-us') {
          this.showcountry = `${event.currentTarget.dataset.country_name_en} - <em> ${event.currentTarget.children[0].innerHTML} </em>`
      }
      this.onoff.show = false
    },
    shareholderDelete (i) {//删除指定大股东数据
      this.push.basic.companyshareholder.shareholder.splice(i, 1)
    },
    beneficiaryDelete (i) {//删除指定机构受益人
      this.push.basic.americanMechanismBeneficiary.beneficiary.splice(i, 1)
    },
    showfun () { // 显示国际码列表
      this.onoff.show = true
    },
    credential_type (d,event) {//证件类型选择
      this.push.basic.companysignerinformation.certificate_type = d.type
      this.showcredential_type_value = d.type
      this.onoff.showselect = false
    },
    showselectfun () {
      this.onoff.showselect = !this.onoff.showselect
    },
    borderColor (event) {
      event.currentTarget.style.borderColor = 'inherit'
    },
    showSelect (opt) {
      let obj = opt.event
      if (obj) {
        // console.log(onoff)

        let onoff = obj[0].dataset.onoff
        // switch (onoff) {
        //   case '1':
        //   obj[0].dataset.onoff = '2'
        //   return '2'
        //   case '2':
        //   obj[0].dataset.onoff = '1'
        //   return '1'
        // }
      }
    },
    // notUsShowList (onoff) {
    //   // var obj = event.currentTarget.parentNode
    //   onoff = !onoff
    // },
    showupload (opt) {
      this.showpop = true
      this.poptitle = opt.title
      this.uploadFileUrlArr = opt.filedisplay.split('.')
      this.uploadSHowList = opt.event.currentTarget
    },
    uploadUrl (d) {
      this.showpop = d.onoff
      switch (this.uploadFileUrlArr.length) {
        case 1:
        this[this.uploadFileUrlArr[0]].push(d.imgurl)
        break
        case 2:
        this[this.uploadFileUrlArr[0]][this.uploadFileUrlArr[1]].push(d.imgurl)
        break
        case 3:
        this[this.uploadFileUrlArr[0]][this.uploadFileUrlArr[1]][this.uploadFileUrlArr[2]].push(d.imgurl)
        break
        case 4:
        this[this.uploadFileUrlArr[0]][this.uploadFileUrlArr[1]][this.uploadFileUrlArr[2]][this.uploadFileUrlArr[3]].push(d.imgurl)
        break
        case 5:
        this[this.uploadFileUrlArr[0]][this.uploadFileUrlArr[1]][this.uploadFileUrlArr[2]][this.uploadFileUrlArr[3]][this.uploadFileUrlArr[4]].push(d.imgurl)
        break
        case 6:
        this[this.uploadFileUrlArr[0]][this.uploadFileUrlArr[1]][this.uploadFileUrlArr[2]][this.uploadFileUrlArr[3]][this.uploadFileUrlArr[4]][this.uploadFileUrlArr[5]].push(d.imgurl)
        break
      }
      this.$nextTick(() => {
        var dom = this.uploadSHowList.parentNode.parentNode.querySelectorAll('ul.showUploadFileList li')
        dom[dom.length-1].querySelector('input').value = d.name
        this.uploadSHowList = ''
        this.uploadFileUrlArr = ''
      })
    },
    closeupload (d) {
      this.showpop = d.showpop
    },
    record () { // 第一个选择国家信息认证判断
      for (var z in this.push.record) {
        if (this.push.record[z] == '') {
          this.$message({
              content: this.$t('common.fullmessage'),
          })
          return
        }
      }
      // if (this.investoreType != push.record.investor_type) { //如果用户已经填写过一些资料。但是重新选择了不同认证投资者。是否提示呢？ 暂定
      //   this.nextonoff = true
      // }
      this.axios.axiospost({
        url: '/user/investors/basicInformation',
        data: this.push.record
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
              content: ret.data.msg,
              type: 'check'
          })
          this.onoff.record = false
          if (this.push.record.country == "United States") {
            this.onoff.notus =  false
            this.onoff.basic = true
            this.select.nav.map((obj, index) => {
              obj.class = ''
              if(obj.url == 'basic') {
                obj.class = 'act'
              }
            })
            this.onoff.personal = false
            this.onoff.company = false
            this.onoff.mechanism = false
            switch (this.push.record.investor_type) {
              case 'personal':
              this.onoff.personal = true
              break
              case 'company':
              this.onoff.company = true
              break
              case 'mechanism':
              this.onoff.mechanism = true
              break
            }
          } else {
            this.select.nav.map((obj, index) => {
              obj.class = ''
              if(obj.url == 'submit') {
                obj.class = 'act'
              }
            })
            this.investorsInfo()
          }
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    investorsInfo (){
      this.axios.axiosget({
          url: '/user/investors/investorsInfo'
        }).then((ret) => {
          let data = []
          var obj = {}
          for (var z in ret.data.data) {
            obj = {
              title :'',
              onoff : false,
              class : z,
              content : ret.data.data[z],
              countries: z
            }
            switch (z) {
              case 'us':
              obj.countries = 'United States'
              obj.countries = 'Israel'
              obj.title = '<strong>UNITED STATES: </strong>Accredited investor definition'
              break
              case 'uk' :
              obj.countries = 'UK'
              obj.title = '<strong>UK:</strong> Qualified investor definition'
              break
              case 'il' :
              obj.countries = 'Israel'
              obj.title = '<strong>ISRAEL:</strong> Qualified investor definition'
              break
              case 'ae' :
              obj.countries = 'United Arab Emirates'
              obj.title = '<strong>UAE:</strong> Qualified investor definitions'
              break
              case 'es' :
              obj.countries = 'Spain'
              obj.title = '<strong>SPAIN:</strong> Qualified investor definition'
              break
              case 'sg' :
              obj.countries = 'Singapore'
              obj.title = '<strong>SINGAPORE:</strong> Accredited investor definition'
              break
              case 'eea' :
              obj.countries = 'European Economic Area'
              obj.title = '<strong>European Economic Area:</strong> Qualified investor definition'
              break
              case 'other' :
              obj.countries = 'Other'
              obj.onoff = true
              obj.title = '<strong>ALL OTHER COUNTRIES:</strong> Accredited investor definitions'
              break
              case 'hk' :
              obj.countries = 'Hong Kong'
              obj.title = '<strong>HONG KONG:</strong> Professional investor definitions'
              break
            }
            data.push(obj)
          }
          data.reverse()
          this.notUsInfoList = data
          this.onoff.notus = true
        }).catch((error) => {
          console.log(error)
        })
    },
    basic (t) { // 提交
      var url = '', data = '', push = false, pushkyc = false
      switch (t.type) {
        case 'personal'://个人基本信息
          push = true
          url = '/user/investors/americanPersonalBasic'
          data = this.push.basic.personal
          var reg = ''
          if (this.push.basic.personal.iso_code == '86') {
            reg = this.DefaultJs.REG.chinamobilereg
          } else {
            reg = this.DefaultJs.REG.notchinamobilereg
          }
          if (!reg.test(this.push.basic.personal.mobile)) {
            this.$message({
              content:this.$t('find.mobileerror')
            })
            return
          }
        break
        case 'submit':
          this.onoff.submit = true
          this.onoff.basic = false
          this.onoff.record = false
          this.select.nav.map((obj, index) => {
            obj.class = ''
            if(obj.url == 'submit') {
              obj.class = 'act'
            }
          })
          window.scrollTo(0, 0)
        return
        case 'CompanyShareholder':
          url = '/user/investors/americanCompanyShareholder' //投资公司大股东
          data = this.push.basic.companyshareholder
          push = false
        break
        case 'CompanyShareholderOwnership':
          url = '/user/investors/americanCompanyShareholderOwnership' //投资公司股东所有权
          data = this.push.basic.companyshareholderownership
          push = false
        break
        case 'companysignerinformation'://投资公司{{$t('investor.si')}}
          url = '/user/investors/americanCompanySignerInformation'
          data = this.push.basic.companysignerinformation
          push = false
        break
        case 'mechanism'://信托{{$t('investor.si')}}
          url = '/user/investors/americanMechanismSignerInformation'
          data = this.push.basic.americanMechanismSignerInformation
          push = false
        break
        case 'americanMechanismDetails'://机构详情
          url = '/user/investors/americanMechanismDetails'
          data = this.push.basic.mechanism
          push = false
        break
        case 'americanMechanismTrustAgreement'://机构信托协议
          url = '/user/investors/americanMechanismTrustAgreement'
          data = this.push.basic.americanMechanismTrustAgreement
          push = false
        break
        case 'americanMechanismBeneficiary'://机构受益人
          url = '/user/investors/americanMechanismBeneficiary'
          data = this.push.basic.americanMechanismBeneficiary
          push = false
        break
        case 'mechanism'://公司{{$t('investor.si')}}
          url = '/user/investors/americanCompanySignerInformation'
          data = this.push.basic.companysignerinformation
          push = false
        break
        case 'americanMechanismSignerInformation'://机构{{$t('investor.si')}}
          url = '/user/investors/americanMechanismSignerInformation'
          data = this.push.basic.americanMechanismSignerInformation
          push = false
        break
        case 'company'://公司基本信息
          url = '/user/investors/americanCompanyDetails'
          data = this.push.basic.company
          push = false
        break
        case 'americanPersonalAssets'://个人资产
          url = '/user/investors/americanPersonalAssets'
          if (this.push.submit.personal.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years') {
            if (!this.push.submit.personal.least) {
              this.$refs['push.submit.personal.least'].style.color="red"
              this.$watch('push.submit.personal.least', () => {
                this.$refs['push.submit.personal.least'].style.color="inherit"
              })
              return
            }
            } else if(this.push.submit.personal.certification_basis == 'Net worth over $1M') {
            if (!this.push.submit.personal.authorized_credit_report) {
              this.$refs['push.submit.personal.authorized_credit_report'].style.color="red"
              this.$watch('push.submit.personal.authorized_credit_report', () => {
                this.$refs['push.submit.personal.authorized_credit_report'].style.color="inherit"
              })
              return
            }
          }
          data = this.push.submit.personal
          pushkyc = true
        break
        case 'americanCompanyAssets':
          url = '/user/investors/americanCompanyAssets' //投资{{$t('investor.ca')}}认证
          if (this.push.submit.company.certification_basis === 'Company has over $5,000,000 in assets') {
            // if (isNaN(this.push.submit.company.company_assets)) {//是否做错误提醒？
            //   this.$refs['push.submit.company.company_assets'].style.borderColor="red"
            //   return
            // }
            // if (this.push.submit.company.company_assets < 5000000) {
            //   this.$refs['push.submit.company.company_assets'].style.borderColor="red"
            //   this.$refs['push.submit.company.company_assets_label'].style.color="red"
            //   return
            // }
          } else {
              this.push.submit.company.company_assets = ''
          }
          data = this.push.submit.company
          pushkyc = true
        break
        case 'americanMechanismAssets'://机构资产认证
          url = '/user/investors/americanMechanismAssets'
          // this.push.submit.mechanism.is_social_security_number = String(this.push.submit.mechanism.is_social_security_number)
          data = this.push.submit.mechanism
          pushkyc = true
          if (this.push.submit.mechanism.certification_basis == 'Income of $200K ($300K with spouse) in each of the last 2 years') {
            if (!this.push.submit.mechanism.least) {
              this.$refs['push.submit.mechanism.least'].style.color="red"
              this.$watch('push.submit.mechanism.least', () => {
                this.$refs['push.submit.mechanism.least'].style.color="inherit"
              })
              return
            }
            } else if(this.push.submit.mechanism.certification_basis == 'Net worth over $1M') {
            if (!this.push.submit.mechanism.authorized_credit_report) {
              this.$refs['push.submit.mechanism.authorized_credit_report'].style.color="red"
              this.$watch('push.submit.mechanism.authorized_credit_report', () => {
                this.$refs['push.submit.mechanism.authorized_credit_report'].style.color="inherit"
              })
              return
            }
          }
        break
        case 'americanMechanismIrrevocable'://机构不可撤销资产认证
          url = '/user/investors/americanMechanismIrrevocable'
          data = this.push.submit.irrevocablemechanism
          pushkyc = true
        break
      }
      this.axios.axiospost({
        url: url,
        data: data
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
              content: ret.data.msg,
              type: 'check'
          })
          if (push) {
            this.onoff.basic = false
            this.onoff.record = false
            this.onoff.submit = true
            this.select.nav.map((obj, index) => {
              obj.class = ''
              if(obj.url == 'submit') {
                obj.class = 'act'
              }
            })
          }
          if (pushkyc) {
            this.complete()
          }
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    nav (url) {
      if (this.onoff.record) return
      if (url == 'complete') return
      if (this.push.record.country == "United States") {
        this.onoff.notus = false
        this.onoff.record = false
        this.onoff.basic = false
        this.onoff.submit = false
        this.onoff.complete = false
        this.onoff.company = false
        this.onoff.personal = false
        this.onoff.mechanism = false
        this.onoff[this.push.record.investor_type] = true
        switch (url) {
          case 'record':
          this.onoff.record = true
          break
          case 'basic':
          this.onoff.basic = true
          break
          case 'submit':
          this.onoff.submit = true
          break
          case 'complete':
          this.onoff.complete = true
          break
        }
      } else {
        if (url == 'basic') return
        if (url == 'submit') {
          if(this.onoff.notus) return
          this.investorsInfo()
          this.onoff.record = false
          this.onoff.notus = true
        }
        switch (url) {
          case 'record':
          this.onoff.record = true
          this.onoff.notus = false
          break
        }
      }
      this.select.nav.map((obj, index) => {
        obj.class = ''
        if (url == obj.url) {
          obj.class = 'act'
        }
      })
    },
    notusPost () { // 非美国投资者认证
      this.axios.axiospost({
        url: '/user/investors/submitApply'
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
              type: 'check'
          })
          this.complete()
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    complete () {
      this.onoff.record = false
      this.onoff.basic = false
      this.onoff.submit = false
      this.onoff.notus = false
      this.select.nav.map((obj, index) => {
        obj.class = ''
        if(obj.url == 'complete') {
          obj.class = 'act'
          this.nav = {}
        }
      })
      this.onoff.complete = true
    },
    backKyc () {
      this.$router.push({name: 'Kyc'})
    },
    repulse () { // 取消非美国投资者认证
      this.onoff.notus = false
      this.$router.push({name: "Kyc"})
    },
    birthday (d) { // 获得用户输入生日时间
      this.push.basic.personal.birthday = `${d.year}-${d.month}-${d.day}`
      this.push.basic.company.date_of_establishment = `${d.year}-${d.month}-${d.day}`
      this.push.basic.companysignerinformation.birthday = `${d.year}-${d.month}-${d.day}`
      this.push.basic.americanMechanismSignerInformation.birthday =  `${d.year}-${d.month}-${d.day}`
    },
    accout (d) { // 获得用户输入账号
      this.push.basic.personal.iso_code = d.intersmsiso
      this.push.basic.personal.mobile = d.username
      this.push.basic.companysignerinformation.iso_code = d.intersmsiso
      this.push.basic.companysignerinformation.mobile = d.username
      this.push.basic.americanMechanismSignerInformation.mobile =  d.username
      this.push.basic.americanMechanismSignerInformation.iso_code =  d.intersmsiso
    },
    shareholdernum () {//增加公司大股东
      this.push.basic.companyshareholder.shareholder.push({name: '',type:'',onoff: false})
    },
    favoreenum () {//增加机构受益人
      this.push.basic.americanMechanismBeneficiary.beneficiary.push({name: '',type:'',onoff: false})
    },
    showdel (opt) {
      this.onoff.delonoff = true
      this.delobj = opt.obj.split('.')
      this.delobjindex = opt.index
    },
    delUploadFile (opt) {
      var obj = this.delobj
      var i = this.delobjindex
      switch (obj.length) {
        case 1:
        this[obj[0]].splice(i,1)
        break
        case 2:
        this[obj[0]][obj[1]].splice(i,1)
        break
        case 3:
        this[obj[0]][obj[1]][obj[2]].splice(i,1)
        break
        case 4:
        this[obj[0]][obj[1]][obj[2]][obj[3]].splice(i,1)
        break
        case 5:
        this[obj[0]][obj[1]][obj[2]][obj[3]][obj[4]].splice(i,1)
        break
        case 6:
        this[obj[0]][obj[1]][obj[2]][obj[3]][obj[5]][obj[5]].splice(i,1)
        break
      }
      this.onoff.delonoff = false
      this.delobj = []
      this.delobjindex = ''
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang (n, o) {
      this.http()
    }
  }
}
</script>
<style lang="less" scoped>
  #investorWrap{min-height:500px;}
  .cursor{cursor: pointer;}
  dt,dd,label{display: flex;flex-flow: column;position:relative;}
  dd,dt{padding:0 30px;background:#fff;box-sizing: border-box;}
  .fa-dot-circle-o{color:#76a6ea;width:20px;height:20px;}
  span{display: block;box-sizing: border-box;line-height:1.7;}
  .fa-caret-down{position: absolute;top:16px;right:10px;font-size:16px;color:#a5aab0;}
  input{box-sizing: border-box;color:#222c38;font-size:14px;}
  dl.row{
    dd.record_radio{display:flex;flex-flow: row;
    label{width:auto;display: flex;flex-flow:wrap;align-items: center;margin:0 140px 0 0;cursor: pointer;
      &:last-child{margin:0;}
      input{margin:0;cursor: pointer;}
    }
    }
  }
  .flexBlock{display: block;flex-shrink: 0;width:100%;}
  h3{color:#2c3541;font-size:16px;font-weight: normal;}
  span{font-size:14px;margin:10px 0;}
  input::placeholder{color:#caccd1;}
  #accout{margin-bottom:30px;
    & /deep/ label{color:#a5aab0!important;margin:30px 0 10px;}
    & /deep/ input{color:#222c38;}
    & /deep/ input::placeholder{color:#caccd1!important;}
  }
  div{
    button.uploadBtn + p{font-size:18px;margin-left:40px;margin-top:46px;}
  }
  h4{color:#2c3541;font-size:14px;margin:20px 0 10px;}
  h5{color:#2c3541;font-size:16px;font-weight: normal;margin:0 0 10px;width:100%;flex-shrink: 0;}
  h6{color:#a5aab0;font-size: 14px;margin:10px 0 10px;font-weight: normal;}
  dl.row{flex-flow:wrap;justify-content: space-between;
    dt{width:100%;flex-shrink: 0;}
    dd{width:100%;flex-flow:column;}
  }
  .row,li,label{
    i.fa{margin-right:10px;font-size:20px;
      &.fa-trash-o{margin-top:36px;cursor: pointer;margin-left: 30px;}
    }
  }
  .certificateType{position:relative;padding:0;
    span{height:50px;border:1px solid #d7d7d7;border-radius:2px;line-height:50px;text-indent:1em;box-sizing: border-box;position:relative;margin:0;color:#222c38;}
  }
  li.row{
    div{
      .certificateType{width: 250px;}
    }
  }
  li{position: relative;
    .certificateType{width:550px;}
  }
  .shareholder{margin:30px 0 0 ;
    li.row{flex-flow: wrap;
      input{width:100%;margin:0;}
      div{width:250px;margin-right:50px;
        &:last-of-type{margin:0;}
      }
      article{padding:0;position:relative}
    }
  }
  a{width:fit-content;font-size: 14px;margin:20px 0 0;
    i.fa{margin-right:10px;
      &.fa-plus-circle{margin:0;}
    }
  }
  .row{display: flex;flex-flow:wrap;align-items:flex-start;
    section{width:250px;margin-right:20px;}
    div{width:250px;margin-top:18px;margin-right:20px;
      input{width:100%;margin:0;}
    }
  }
  .type{position:relative;}
  .shrink{flex-shrink: 0;width:100%;}
  dt.title{padding-bottom:20px;
    label{display: flex;flex-flow:row;margin:10px 0;align-items: center;}
  }
  p.row{display: flex;flex-flow:column;
    label{display: flex;flex-flow:row;}
  }
  #submit{
    .mechanism_submit{
      dd{margin-bottom:1px;padding-bottom:30px;
        &.mechanism_annual{
          label{margin-bottom: 13px;}
          h5{margin:30px 0 20px}
          h4{margin:30px 0 10px}
        }
        &.mechanism_ratepaying{
          span{margin:4px 0 10px}
          label.check{margin-top:4px;}
        }
        &.mechanism_cloce{padding-bottom: 80px;
          h5{margin-bottom: 20px;}
          div.row{margin:14px 0 40px;
          }
        }
        &.mechanism_assets{
          h5{margin:30px 0 10px;}
          label{margin:10px 0px 12px;}
        }
      }
      dt{
        &.title{
          h5{margin:20px 0 6px;}
        }
      }
      .check{margin:0;
        p{
          span{line-height: 1.7;margin:0;}
        }
      }
      ol{margin-top:10px;
        li{margin:0;
          label{flex-flow: wrap;align-items: center;}
          input{margin-top:10px;
            &[type="radio"]{margin:0;}
          }
        }
      }
      .yourassets{
        .check{align-items: flex-start;
          i{margin-top:10px;}
          p{
            span{line-height: 2.4;}
          }
        }
      }
    }
    dd.notclose{padding-bottom:20px;
      h5{margin-top:20px;}
      label{margin-bottom:14px;}
      ul{
        li{list-style: decimal;margin-left:1em;line-height:1.75;margin-bottom:0;font-size:14px;}
      }
    }
    dt{margin-bottom:1px;
      h5{margin-bottom:6px;;}
    }
    label{margin:10px 0 4px;}
    input{margin-bottom: 10px;}
    s{margin: 10px 0 14px;}
    h5{margin:26px 0 10px;}
    dd{position:relative;
      div{line-height:1.75;
        h6{margin:30px 0 18px;}
      }
      article{display: flex;position:relative;padding: 20px 0 0;
        i.fa{margin-right:10px;}
        input{position: absolute;top:0;left:0;}
      }
    }
  }
  label{margin:0 0 10px; font-size:14px;}
  i.fa{width:20px;height:20px;}
  input:disabled{background:#f4f5f6;}
  input[type=radio]{width:100%;height:100%;border: 1px solid #d7d7d7;margin-right:10px;position: absolute;top:0;left:0;opacity: 0;z-index: 123;}
  input[type=text]{width: 550px;height: 50px;text-indent: 1em;border-radius: 2px;line-height: 50px;border: 1px solid #d7d7d7;}
  input[type=checkbox]{width:100%;height:100%;display: block;}
  button{width: 209px;height: 50px;line-height: 50px;text-align: center;border: 1px solid #d7d7d7;border-radius: 2px;color: #fff;font-size: 18px;background: #357ce1;display: block;margin:20px 0;
    &.uploadBtn{background:#f4f5f6;color:#2c3541;font-size:18px;border-color:#d7d7d7;margin:30px 0 20px 0;
      &.mt14{margin-top:14px;}
    }
  }
  section{position:relative;width:550px;
    span{display: block;width:100%;height:50px;line-height: 50px;border: 1px solid #d7d7d7;border-radius:2px;text-indent: 1em;margin:0;color:#222c38;}
  }
  ul.intersmsiso{z-index: 123444;text-align: center;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
    position:absolute;top:49px;left:0;background:#fff;color:#caccd1;font-size: 18px;
    width:100%;overflow-y: auto;border:1px solid #ddd;height:auto;box-sizing:border-box;overflow-x:hidden;
    &.height{height:400px;}
    &::-webkit-scrollbar{width: 9px;}
    &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
    li{font-size:14px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;justify-content:space-between;cursor: pointer;flex-flow:wrap;box-sizing:bo
      &:hover{background:#f4f5f6;color:#5a626d;}
      em{line-height:49px;}
    }
  }
  .mt14{margin-top:14px;}
  .mt24{margin-top:24px;}
  .pd30{padding-bottom: 30px;}
  .pdt10{padding-top: 10px;}
  .pdb10{padding-bottom: 10px;}
  .check.mt24{margin-bottom:24px;}
  dd{
    & /deep/ #accout{width:550px;color:#222c38;}
    li{margin-bottom:20px;}
  }
  .site{display: flex;flex-flow:column;
    label{display: block;flex-shrink: 0;width:100%;}
    div{width:550px;}
    input{width:170px;margin-right:20px;box-sizing: border-box;}
    input:nth-of-type(1) {width:360px;}
    input:nth-of-type(2) {margin-right:0;}
    input:nth-of-type(5) {margin-right:0;}
  }
  .row{display: flex;flex-flow:row;
    label{width:100%;flex-shrink:0;
      input{width:100%;}
    }
  }
  article#createTime{line-height:50px;padding:0;
    & /deep/ span{line-height:50px;margin:0 10px;height:50px;color:#222c38;}
    & /deep/ p{line-height:50px;}
    & /deep/ section {width:136px;height:50px;line-height:50px;
      span{width:136px;height:50px;line-height:50px;margin:0;background:#ffff;border-color:#d7d7d7;
        i.fa{line-height:44px;}
      }
      ul{top:50px;}
    }
  }
  ol{
    li{display: flex;flex-flow:row;position: relative;margin:0;
      input{margin-right:10px;}
    }
  }
  article{padding: 0 0 50px;color:#a5aab0;font-size:14px;}
  #investor{min-height:300px;
    .showUploadFileList{width:100%;border-top:1px solid #d7d7d7;margin:6px 0 10px;
      li{display: flex;justify-content: space-between;height:50px;line-height:50px;width:100%;color:#d7d7d7;align-items:center;border-bottom:1px solid #d7d7d7;margin:0;
        input{background:none;border:none;width:calc(100% - 50px);color:#2c3541;margin:0;
          &::placeholder{color:#2c3541;}
          &:disabled{background:#fff;}
        }
        a{width:50px;flex-shrink: 0;display: block;color:#2c3541;margin:0;}
      }
    }
    #record{padding:30px 0 0 0;background:#fff;
      article{background:#fff;padding: 1px 30px 36px;box-sizing:border-box;margin-top:-4px;
        section{padding:0;}
      }
      dl{margin-bottom: 10px;
        dt{padding-bottom:20px;background:#fff;}
        dd{padding-bottom:18px;flex-flow:wrap;
          &.row{flex-flow: column;align-items:normal;margin-top:20px;}
        }
      }
      input{margin-bottom:50px;}
      button{margin: 0 0 30px;}
    }
  }
  #notus{padding:30px;background:#fff;display:flex;flex-flow:wrap;min-height:400px;
    button{margin-right:40px;border:none;
      &.repulse{background:#e4e4e4;color:#a5aab0;}
    }
    ol{border:1px solid #f2f3f8;border-left:none;border-right:none;margin:20px 0;
      div{height:0px;transition: .5s;color:#a5aab0;font-size:14px;line-height:1.75;border-bottom:0px solid #f2f3f8;
        &.us{height:360px;transition: .5s;border-bottom-width: 1px;}
        &.uk{height:1610px;transition: .5s;border-bottom-width: 1px;}
        &.il{height:910px;transition: .5s;border-bottom-width: 1px;}
        &.ae{height:340px;transition: .5s;border-bottom-width: 1px;}
        &.es{height:140px;transition: .5s;border-bottom-width: 1px;}
        &.sg{height:1630px;transition: .5s;border-bottom-width: 1px;}
        &.eea{height:420px;transition: .5s;border-bottom-width: 1px;}
        &.other{height:470px;transition: .5s;border-bottom-width: 1px;}
        &.hk{height:2170px;transition: .5s;border-bottom-width: 1px;}
        & /deep/ ul:nth-child(1){padding: 20px;}
        & /deep/ article,& /deep/ em,& /deep/ div,& /deep/ li,& /deep/ p{line-height:1.75;font-size:14px;}
        & /deep/ ul{
          li{margin-bottom:10px;
            p{}
            article{
              p{padding-left: 2em;

                &:before{display: inline-block;width:6px;height:6px;background: #000;border-radius: 50%;content:'';margin:0 10px 2px 0;}
              }
            }
            blockquote{padding-left:2em;
              p{padding-left: 2em;
                &:before{display: inline-block;width:6px;height:6px;background: #000;border-radius: 50%;content:'';margin:0 10px 2px 0;}
              }
              article{
                p{padding-left: 3em;
                  &:before{display: inline-block;width:6px;height:6px;background:transparent;border:1px solid #000;box-sizing: border-box;border-radius: 50%;content:'';margin:0 10px 2px 0;}
                }
              }
            }
          }
        }
      }
      p.title{height:50px;line-height:50px;font-size: 14px;color:#2c3541;display: flex;justify-content: space-between;border-bottom:1px solid #f2f3f8;box-sizing: border-box;align-items: center;cursor: pointer;}
      li.box{overflow:hidden;flex-flow:column;
      }

    }
  }
  .nav{display: flex;margin-bottom:1px;color:#222c38;font-size:16px;height:60px;line-height:60px;padding:0 30px;background:#fff;
    li{display:flex;flex-flow:wrap;align-items:center;width:auto;cursor: pointer;
      &.act{color:#357ce1;
        i.fa{color:#222c38;}
      }
      &.act.complete{cursor: default;}
      i.fa{margin:0 10px;text-align: center;color:#222c38;}
      &:last-child i{display: none;}
    }
  }
  #basic{
    .basic_personal{
      .site{
        &.pd30{padding-bottom:30px;}
      }
    }
    .basic_company{
      dt{padding:0 30px 20px;span{margin:6px 0;}}
      dd{margin-bottom:1px;h4{margin-top:30px;}
        &.company_details.pd30{padding-bottom:24px;}
        .shareholder{margin:0;
          .row{
            div{margin-top:10px;}
          }
        }
        &.company_shareholder{padding-bottom: 22px;
          h4{margin-top: 38px;}
          span{margin:0;}
          div.row{margin-bottom:20px;}
          & + dd.pd30{padding-bottom:30px;}
        }
      }
      li.site{
        h5{margin-top:14px;}
        div{
          input{margin-bottom:30px;}
        }
      }
      a{margin-top:6px;}
    }
    .basic_mechanism{margin-bottom:1px;
      dt{padding-bottom:4px;}
      dd{margin-bottom:1px;padding-bottom:30px;}
      .mechanism_details{padding-bottom: 22px;
        h4{margin:30px 0 0;}
        div.row{margin-bottom:20px;
          label.row{width:auto;margin-right:180px;margin-top:0;}
        }
      }
      .agreement{
        h4{margin-top:28px;}
        span{margin:4px 0 6px;}
      }
      .americanMechanismBeneficiary_beneficiary{
        h4{margin:30px 0 0;}
        ul.shareholder{margin:20px 0 0;}
        li.row{
          div{margin-top:0;margin-right:20px;}
        }
        a{margin:0;}
        button{margin-top:30px;}
      }
      .americanMechanismSignerInformation{
        h4{margin:30px 0 0;}
        h6{margin:6px 0 14px;padding-top:10px;}
        li{
          h4 + span{margin-top: 18px;}
        }
      }
    }
    dt{padding:20px 30px;margin-bottom:1px;
    }
    h4{color:#2c3541;font-size: 16px;}
    h5{color:#a5aab0;font-size: 14px;}

    dd{padding:0 30px;}
    .site{padding-bottom: 0;margin:0;
      input{margin-bottom:40px;}
    }
  }
  dl.company_submit{
    dd.AssetFiles{
      ol{
        li{list-style: decimal;display: list-item;width:98%;margin-left:2%;line-height: 1.7;font-size: 14px;margin-bottom:10px;}
      }
    }
  }
  .check{display: flex;flex-flow:row;position:relative;align-items:center;
    span{line-height:1.7;}
    input{position:absolute;top:0;left:0;width:100%;height:100%;opacity: 0;z-index: 12345;}
  }
  select{width:250px;height:50px;border:1px solid #d7d7d7;border-radius:2px;
    option{height:50px;line-height:50px;}
  }
  .delbox{width:466px;height:160px;text-align:center;padding:50px;background-color: rgb(255, 255, 255);box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
    p{margin:30px 0 50px;}
    i.fa.fa-times{font-weight: 200;font-size: 20px;position: absolute;top:24px;right:24px;cursor: pointer;color:#bbbcbc;}
    button{width:460px;height:50px;line-height:50px;text-align: center;color:#fff;font-size:18px;background:#357ce1;border-radius: 2px;}
  }
  #complete{background:#fff;overflow:hidden;padding: 0 30px;
    h4{color:#2c3541;font-size:16px;}
    span{color:#a5aab0;font-size:14px;}
    button{margin:60px 0 90px;}
  }
  s,b,strong{font-weight: normal;font-size:14px;}

  .personal_submit{
    dd{padding-top:6px;margin-bottom:1px;}
  }
  .personaluploadfile{
    li{height:40px;line-height:40px;align-items: center;}
  }
  .authorized_credit_report{display: block;overflow: hidden;margin-top:0;margin-bottom:30px;
    i{float:left;height:100%;margin-top:14px;}
    span{float:right;width:96.6%;}
  }
  .flowwrap{flex-flow: wrap;}
  li.row.flowwrap{div{margin-top:0;}}
</style>
