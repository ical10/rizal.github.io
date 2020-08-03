---
title: "Fourier transform & linear inverse problem"
date: 2019-10-28
tags: [Butterworth filter, Fast Fourier Transform, linear inverse problem]
header:
  image: "/images/BRD_VER_1_tinified.png"
excerpt: "Butterworth filter, Fast Fourier Transform, linear inverse problem"
mathjax: "true"
---

# Simple utilisation of Fast Fourier Transform and Butterworth filter

Here we will show a short usage of FFT and Butterworth filter.

```python
import numpy as np
import matplotlib.pyplot as plt
import scipy.signal as scp

#definition of variables
nv=256
nl = 256
nc = 130
k1=float(0.05*256)
k2=float(0.07*256)
k3=float(0.09*256)
eps=0.1
cnd=1.e-7


def moncos(nv, n, k):
    val = np.cos(2.*np.pi*k*n/nv)
    return val


def mk_synth_data(nv, k1, k2, k3, eps):
    #
    # Defines a data set of length nv and made of cosine waves
    # of frequencies k1, k2, k3 + plus white noise eps
    # returns dat
    #
    dat = np.array([moncos(nv, n, k1) for n in range(nv)])
    dat += np.array([moncos(nv, n, k2) for n in range(nv)])
    dat += np.array([moncos(nv, n, k3) for n in range(nv)])
    dat += np.random.randn(nv) * eps
    return dat


def myplot(ddat):
    #
    # Plot Data
    #
    try:
        plt.figure(0)
        plt.plot(ddat, label='Time series')
        plt.legend(loc='upper center')
        plt.xlabel('Point number')
        plt.ylabel('Signal')
        plt.show()
    except Exception as msg:
        print ('**** ERROR:')
        print (msg)
    else:
        print ('myplot: Work done')




def myFFT(ddat):
    #
    # Compute and plot FFT spectrum
    #
    try:
        mafft = np.fft.fft(ddat)
        spctr = abs(mafft)
#
        plt.figure(1)
        plt.plot(spctr, label='FFT transform')
        plt.legend(loc='upper center')
        plt.xlabel('Point number')
        plt.ylabel('Amplitude')
        plt.yscale('log')
        plt.show()
    except Exception as msg:
        print ('**** ERROR:')
        print (msg)
    else:
        print ('maFFT: Work done')

def myButterworth(no, ck, ddat):
    #
    # Apply "no" order Butterworth filter (ck =< Nyquist k value)
    # return bdat
    try:
        pcf = ck * 2./ddat.size
        b, a = scp.butter(no, pcf)
        bdat = scp.lfilter(b, a, ddat)
        mafft = np.fft.fft(bdat)
        spctr = abs(mafft)
#
        plt.figure(2)
        plt.plot(spctr, label='FFT Bfiltered transform')
        plt.legend(loc='upper center')
        plt.xlabel('Point number')
        plt.ylabel('Amplitude')
        plt.yscale('log')
        plt.show()
        return bdat
    except Exception as msg:
        print ('**** ERROR:')
        print (msg)
    else:
        print ('myButterworth: Work done')


def myOtherButterworth(no, ck, ddat):
    #
    # Apply "no" order Butterworth filter (ck =< Nyquist k value)
    # re-apply it with opposite phase
    # return obdat
    try:
        pcf = ck * 2./ddat.size
        b, a = scp.butter(no, pcf)
        obdat = scp.filtfilt(b, a, ddat)
        mafft = np.fft.fft(obdat)
        spctr = abs(mafft)
#
        plt.figure(1)
        plt.plot(spctr, label='FFT BBfiltered transform')
        plt.legend(loc='upper center')
        plt.xlabel('Point number')
        plt.ylabel('Amplitude')
        plt.yscale('log')
        plt.show()
        return obdat
    except Exception as msg:
        print ('**** ERROR:')
        print (msg)
    else:
        print ('myOtherButterworth: Work done')



def AA(nl, nc):
    #
    #   Computes Fourier Matrix
    #   Calls to moncos
    #   returns aa (-- i.i. the matrix A)
    #
    aa = np.array([[moncos(nl, n, k) for k in range(nc)] for n in range(nl)])
    dm = 1.e-15 * np.amax(aa)
    aa[abs(aa) < dm] = 0.
    return aa


def CE(nv, eps):
    #
    #   Computes and returns Data Covarience Matrix ce
    #
    ce = eps * eps * np.eye(nv, nv)
    return ce

def invert_AA(nv, cnd, aa):
    #
    #   Invert AA by winnowing
    # return AAi
    try:
        L, V = np.linalg.eigh(aa)
        L[abs(L) < cnd] = 0.
        M = L != 0
        Vt = np.transpose(V)
        Vt = Vt[M]
        V = np.transpose(Vt)
        L = L[M]
    #
        D = np.diag(1./L)
        AAi = np.matmul(D, Vt)
        AAi = np.matmul(V, AAi)
    #
        return AAi
    except Exception as msg:
        print ('**** ERROR:')
        print (msg)
    else:
        print ('INVERT AA for minimum norm: Work done')


def AtWA(nl, nc, eps):
    #
    #   Computes At.CE^{-1}.A
    #   Calls to AA, CE
    # return GG
    aa = AA(nl, nc)
    ww = np.linalg.inv(CE(nl, eps))
    aat = np.transpose(aa)
    #
    GG = np.matmul(ww, aa)
    GG = np.matmul(aat, GG)
    dm = 1.e-15 * np.amax(GG)
    GG[abs(GG) < dm] = 0.
    # print 'At.W.A'
    # print GG
    return GG


synth_data = mk_synth_data(nv, k1, k2, k3, eps)
myplot(synth_data)

```


![png](/images/practical_1_Inverse_Problems_files/practical_1_Inverse_Problems_0_0.png)



```python

filt_data = myButterworth(10, 100, synth_data)
myplot(filt_data)
```


![png](/images/practical_1_Inverse_Problems_files/practical_1_Inverse_Problems_1_0.png)



![png](/images/practical_1_Inverse_Problems_files/practical_1_Inverse_Problems_1_1.png)




```python
filt_data2 = myButterworth(10, 50, synth_data)
myplot(filt_data2)


```


![png](/images/practical_1_Inverse_Problems_files/practical_1_Inverse_Problems_2_0.png)



![png](/images/practical_1_Inverse_Problems_files/practical_1_Inverse_Problems_2_1.png)



```python
filt_data3 = myButterworth(10, 20, synth_data)
myplot(filt_data3)
```


![png](/images/practical_1_Inverse_Problems_files/practical_1_Inverse_Problems_3_0.png)



![png](/images/practical_1_Inverse_Problems_files/practical_1_Inverse_Problems_3_1.png)



```python

```
# A short instance of linear inverse problem (will be published soon...)
